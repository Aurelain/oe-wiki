import fs from 'node:fs';
import fsp from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import build from '../build/build.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const PORT = 8000;
const BUILD_TIMEOUT = 100; // milliseconds, how long to wait after a file change before we call build()
const LIVERELOAD_ENDPOINT = '/livereload';
const INPUT_DIR = 'src';
const OUTPUT_DIR = 'dev';
const PRODUCTION_DIR = 'docs';
const INPUT_PATH = path.resolve(path.join(import.meta.dirname, '..', '..', INPUT_DIR));
const OUTPUT_PATH = path.resolve(path.join(import.meta.dirname, '..', '..', OUTPUT_DIR));
const PRODUCTION_PATH = path.resolve(path.join(import.meta.dirname, '..', '..', PRODUCTION_DIR));
const CONTENT_TYPE = {
    '.js': 'text/javascript',
    '.css': 'text/css',
};
// Script injected into HTML pages to listen for reload triggers:
const LIVERELOAD_SCRIPT = `
    <script>
        const eventSource = new EventSource('${LIVERELOAD_ENDPOINT}');
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
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function onRequest(req, res) {
    if (req.url === LIVERELOAD_ENDPOINT) {
        return handleLiveReloadEndpoint(req, res);
    }

    const url = req.url === '/' ? '/index.html' : req.url;
    const filePath = OUTPUT_PATH + url;
    const extname = path.extname(filePath);

    fs.readFile(filePath, (err, content) => handleFileRead(err, content, extname, req, res));
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

    // Watch the current directory for file changes
    const watcher = fs.watch(INPUT_PATH, {recursive: true}, () => {
        buildAudience.add(res);
        clearTimeout(buildTimeout);
        buildTimeout = setTimeout(performBuild, BUILD_TIMEOUT);
    });

    req.on('close', () => watcher.close());
}

/**
 *
 */
function handleFileRead(err, content, extname, req, res) {
    if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
        return;
    }
    const contentType = CONTENT_TYPE[extname] || 'text/html';
    res.writeHead(200, {'Content-Type': contentType});

    // Inject livereload script automatically into HTML files:
    if (extname === '.html' || req.url === '/') {
        content = content.toString().replace('</body>', `${LIVERELOAD_SCRIPT}\n</body>`);
    }
    res.end(content);
}

/**
 *
 */
async function performBuild() {
    if (OUTPUT_PATH !== PRODUCTION_PATH) {
        await fsp.rm(OUTPUT_PATH, {recursive: true, force: true});
        await fsp.cp(PRODUCTION_PATH, OUTPUT_PATH, {recursive: true});
    }
    await build('-o', OUTPUT_PATH, '--dev', '--mute');
    for (const res of buildAudience) {
        res.write('data: reload\n\n');
    }
    buildAudience.clear();
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
start();
