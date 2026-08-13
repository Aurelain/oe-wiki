import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import build from '../build/build.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const PORT = 8000;
const BUILDS_TIMEOUT = 100; // milliseconds, how long to wait before trigger the builds in `buildPending`
const LIVERELOAD_ENDPOINT = '/livereload';
const SRC = 'src';
const OUT = 'docs';
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
    </script>`;
const SRC_DIR = path.resolve(path.join(import.meta.dirname, '..', '..', SRC));
const OUT_DIR = path.resolve(path.join(import.meta.dirname, '..', '..', OUT));

/*
{
    'parse': Set([res, res, ...]),
    'setup': Set([res, res, ...]),
    ...
}
 */
let buildsPending = {};
let buildsTimeout;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function start() {
    const server = http.createServer(onRequest);
    server.listen(PORT, () => {
        console.log(`Reflecting "${SRC}" to "${OUT}" at http://localhost:${PORT}.`);
    });
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
    const filePath = OUT_DIR + url;
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
    const watcher = fs.watch(SRC_DIR, {recursive: true}, (eventType, filename) => {
        const dirName = path.dirname(filename);
        // console.log(`${filename} changed, so "${dirName}" will soon be rebuilt.`);
        buildsPending[dirName] = buildsPending[dirName] || new Set();
        buildsPending[dirName].add(res);
        clearTimeout(buildsTimeout);
        buildsTimeout = setTimeout(performBuilds, BUILDS_TIMEOUT);
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
async function performBuilds() {
    for (const key in buildsPending) {
        const target = path.join(SRC, key, key + '.js');
        await build(target);
        const list = buildsPending[key];
        for (const res of list) {
            res.write('data: reload\n\n');
        }
        delete buildsPending[key];
    }
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
start();
