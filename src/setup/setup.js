import HTML_USER from './html/HTML_USER.js';
import log, {setLogHost} from './log.js';
import {LOG_HOST} from './SETTINGS.js';
import HTML_DEV from './html/HTML_DEV.js';
import {readFromDb} from './utils/LocalDb.js';
import sendAndReceive from './helpers/sendAndReceive.js';
import send from './helpers/send.js';
import findFiles from './utils/findFiles.js';
import vitalizeUser from './vitalizeUser.js';
import vitalizeDev from './vitalizeDev.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const GAME_DIR_HANDLE = 'gameDirHandle';
let parser;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function setup() {
    const root = document.getElementById('setup');
    if (!root) {
        return;
    }

    // Config:
    const isDev = root.dataset.dev === '1';
    const parsePath = root.dataset.parse;

    // Markup:
    root.innerHTML = isDev ? HTML_DEV : HTML_USER;
    setLogHost(root.querySelector('.' + LOG_HOST));
    log('Initialized.');

    // Import parser:
    await importParser(parsePath);

    // Add event handlers and make dynamic touch-ups:
    isDev ? await vitalizeDev(root, runParse) : await vitalizeUser(root, runParse);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function importParser(url) {
    // log('Connecting to parser...');
    parser = new Worker(`data:application/javascript,importScripts('${url}');`);
    parser.addEventListener('error', () => log('!Parser error!'));
    await sendAndReceive(parser, 'ready');
    log('Connected to parser.');
    parser.addEventListener('message', onMessageFromParser);
}

/**
 *
 */
async function onMessageFromParser(event) {
    const data = event.data && typeof event.data === 'object' ? event.data : {};
    const {type, payload} = data;
    switch (type) {
        case 'find': {
            // console.log(`Parent received a "${type}" inquiry.`);
            const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
            const [pattern, exclude, onlyFirstResult] = payload;
            const result = await findFiles(gameDirHandle, pattern, exclude, onlyFirstResult);
            send(parser, 'find', result);
            break;
        }
        case 'log': {
            // console.log(`Parent received a "${type}" command.`);
            log(...payload);
            break;
        }
    }
}

/**
 *
 */
async function runParse() {
    log('Started parsing...');
    const result = await sendAndReceive(parser, 'run');
    log(`Received parsing results (${Object.keys(result).length}).`);
    return result;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
setup();
