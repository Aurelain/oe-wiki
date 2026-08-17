import {Worker} from 'node:worker_threads';
import findFiles from './findFiles.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const PARSER_LOCATION = '/a/aims/oe-wiki/src/parse/parse.js';
const GAME_DIR = '/home/aurelain/.steam/debian-installation/steamapps/common/Heroes of Might and Magic Olden Era';
const WIKI_MIRROR_DIR = '/a/aims/oe-local/wiki';
let worker;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function write() {
    await loadWorker();
    const results = await sendAndReceive(worker, 'run');

    for (const key in results) {
        const path = WIKI_MIRROR_DIR + '/Data/' + key + '.wiki';
        const content = results[key];
        console.log('========\n' + path + '\n' + content);
        // fs.writeFileSync(path, content);
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function loadWorker() {
    worker = new Worker(PARSER_LOCATION);
    return new Promise((resolve) => {
        const listener = (data) => {
            if (data?.type === 'ready') {
                worker.off('message', listener);
                console.log('Connected to parser.');
                worker.on('message', onMessageFromParser);
                resolve();
            }
        };
        worker.on('message', listener);
    });
}

/**
 *
 */
async function onMessageFromParser(data) {
    const {type, payload} = data;
    switch (type) {
        case 'find': {
            const [pattern, exclude, onlyFirstResult] = payload;
            const result = await findFiles(GAME_DIR, pattern, exclude, onlyFirstResult);
            send(worker, 'find', result);
            break;
        }
        case 'log': {
            console.log(...payload);
            break;
        }
    }
}
/**
 *
 */
function send(worker, type, payload) {
    worker.postMessage({type, payload});
}

/**
 *
 */
async function sendAndReceive(worker, type, payload) {
    return new Promise((resolve) => {
        const listener = (data) => {
            if (data.type === type) {
                // console.log(`Parent received a "${type}" reply.`);
                worker.off('message', listener);
                resolve(data.payload);
            }
        };
        worker.on('message', listener);
        worker.postMessage({type, payload});
    });
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
write();
