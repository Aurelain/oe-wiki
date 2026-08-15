import HTML_USER from './html/HTML_USER.js';
import log, {setLogHost} from './log.js';
import {BTN_GAME, BTN_MIRROR, DIFF_LIST, IS_GRANTED, LOG_HOST} from './SETTINGS.js';
import HTML_DEV from './html/HTML_DEV.js';
import {readFromDb} from './utils/LocalDb.js';
import sendAndReceive from './helpers/sendAndReceive.js';
import send from './helpers/send.js';
import findFiles from './utils/findFiles.js';
import getFile from './utils/getFile.js';
import buildDiff from './helpers/buildDiff.js';
import vitalizeUser from './vitalizeUser.js';
import vitalizeDev from './vitalizeDev.js';
import checkPermission from './helpers/checkPermission.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const GAME_DIR_HANDLE = 'gameDirHandle';
const MIRROR_DIR_HANDLE = 'mirrorDirHandle';
let parser;
let parserResult;
let mirrorResult;

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
    isDev ? await vitalizeDev(runParse) : await vitalizeUser(runParse);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function updateGrantedIcons() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    const isGameGranted = await checkPermission(gameDirHandle);
    document.querySelector('.' + BTN_GAME)?.classList.toggle(IS_GRANTED, isGameGranted);

    const mirrorDirHandle = await readFromDb(MIRROR_DIR_HANDLE);
    const isMirrorGranted = await checkPermission(mirrorDirHandle);
    document.querySelector('.' + BTN_MIRROR)?.classList.toggle(IS_GRANTED, isMirrorGranted);
}

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
async function refreshDevDiff() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    if (!(await checkPermission(gameDirHandle))) {
        return;
    }
    await runParse();
    await runDevMirror();
    buildDiff(mirrorResult, parserResult, document.querySelector('.' + DIFF_LIST));
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

/**
 *
 */
async function runDevMirror() {
    mirrorResult = {};
    const mirrorDirHandle = await readFromDb(MIRROR_DIR_HANDLE);
    if (!(await checkPermission(mirrorDirHandle))) {
        return;
    }
    for (const path in parserResult) {
        const file = await getFile(mirrorDirHandle, path);
        mirrorResult[path] = file ? await file.text() : undefined;
    }
    // mirrorResult['Data/Difficulty~Easy.wiki'] += 'x';
    // mirrorResult['Data/Difficulty~Normal.wiki'] = undefined;
    // mirrorResult['Data/Difficulty~Expert.wiki'] = undefined;
    // mirrorResult['Data/Difficulty~Impossible.wiki'] = undefined;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
setup();
