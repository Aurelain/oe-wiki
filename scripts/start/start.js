// noinspection JSIgnoredPromiseFromCall,ES6MissingAwait

import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import build from '../build/build.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const PORT = 8000;
const BUILD_TIMEOUT = 200; // milliseconds, how long to wait after a file change before we call build()
const LIVE_RELOAD_ENDPOINT = '/live-reload';
const INPUT_DIR = path.resolve(path.join(import.meta.dirname, '..', '..', 'src'));
const OUTPUT_DIR = path.resolve(path.join(import.meta.dirname, '..', '..', 'dev')); // not docs!
const PRODUCTION_DIR = path.resolve(path.join(import.meta.dirname, '..', '..', 'docs'));
const CONTENT_TYPE = {
    '.js': 'text/javascript',
    '.css': 'text/css',
};
// Script injected into HTML pages to listen for reload triggers:
const LIVERELOAD_SCRIPT = `
    <script>
        const eventSource = new EventSource('${LIVE_RELOAD_ENDPOINT}');
        eventSource.onmessage = (e) => {
            if (e.data === 'reload') {
                window.location.reload();
            }
        };
        eventSource.onerror = () => {
            eventSource.close();
        };
    </script>`;

const buildAudience = new Set(); // contains <res> objects
let buildTimeout;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function start() {
    await performBuild();
    const server = http.createServer(onRequest);
    server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}.`));
    watchDir(INPUT_DIR);
    watchDir(PRODUCTION_DIR);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function performBuild() {
    await fs.rm(OUTPUT_DIR, {recursive: true, force: true});
    await fs.cp(PRODUCTION_DIR, OUTPUT_DIR, {recursive: true});
    try {
        await build('-o', OUTPUT_DIR, '--dev');
    } catch (e) {
        console.error('Build failed!');
        return;
    }
    for (const res of buildAudience) {
        res.write('data: reload\n\n'); // broadcast reload command
    }
    buildAudience.clear();
}

/**
 *
 */
function onRequest(req, res) {
    if (req.url === LIVE_RELOAD_ENDPOINT) {
        return handleLiveReloadEndpoint(req, res);
    }

    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = OUTPUT_DIR + url;
    const extname = path.extname(filePath);

    serveFile(filePath, extname, req, res);
}

/**
 *
 */
function handleLiveReloadEndpoint(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
    });
    buildAudience.add(res);
    req.on('close', () => buildAudience.delete(res));
}

/**
 *
 */
async function serveFile(filePath, extname, req, res) {
    let content;
    try {
        content = await fs.readFile(filePath);
    } catch (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
        return;
    }

    const contentType = CONTENT_TYPE[extname] || 'text/html';
    res.writeHead(200, {'Content-Type': contentType});

    // Inject live-reload script automatically into HTML files:
    if (extname === '.html') {
        content = content.toString().replace('</body>', `${LIVERELOAD_SCRIPT}\n</body>`);
    }
    res.end(content);
}

/**
 *
 */
async function watchDir(dirPath) {
    const watcher = fs.watch(dirPath, {recursive: true});
    for await (const event of watcher) {
        // console.log(event.filename, 'changed!');
        if (event.filename && !event.filename.startsWith('.')) {
            clearTimeout(buildTimeout);
            buildTimeout = setTimeout(performBuild, BUILD_TIMEOUT);
        }
    }
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
start();
