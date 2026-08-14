import HTML_USER from './html/HTML_USER.js';
import log, {setLogHost} from './log.js';
import {BTN_GAME, BTN_MIRROR, IS_GRANTED, LOG_HOST} from './SETTINGS.js';
import HTML_DEV from './html/HTML_DEV.js';
import on from './utils/on.js';
import {readFromDb, writeToDb} from './utils/LocalDb.js';
import sendAndReceive from './sendAndReceive.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const GAME_DIR_HANDLE = 'gameDirHandle';
const MIRROR_DIR_HANDLE = 'mirrorDirHandle';
let parser;
let parserResult;

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
    await checkGrantedDirs();
    log('Initialized.');

    // Events:
    addEvents();

    // Import parser:
    await importParser(parsePath);
    if (isDev) {
        await runParse();
        // await getMirror();
        // buildDiff();
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function addEvents() {
    on('click', '.' + BTN_GAME, onGameClick);
    on('click', '.' + BTN_MIRROR, onMirrorClick);
}

/**
 *
 */
async function checkGrantedDirs() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    document.querySelector('.' + BTN_GAME)?.classList.toggle(IS_GRANTED, !!gameDirHandle);

    const mirrorDirHandle = await readFromDb(MIRROR_DIR_HANDLE);
    document.querySelector('.' + BTN_MIRROR)?.classList.toggle(IS_GRANTED, !!mirrorDirHandle);
}

/**
 *
 */
async function onGameClick() {
    let dirHandle;
    try {
        dirHandle = await window.showDirectoryPicker({mode: 'read'});
    } catch (e) {}
    if (dirHandle) {
        await writeToDb(GAME_DIR_HANDLE, dirHandle);
        await checkGrantedDirs();
    }
}

/**
 *
 */
async function onMirrorClick() {
    let dirHandle;
    try {
        dirHandle = await window.showDirectoryPicker({mode: 'read'});
    } catch (e) {}
    if (dirHandle) {
        await writeToDb(MIRROR_DIR_HANDLE, dirHandle);
        await checkGrantedDirs();
    }
}

/**
 *
 */
async function importParser(url) {
    parser = new Worker(`data:application/javascript,importScripts('${url}');`);
    parser.addEventListener('error', () => log('!Parser error!'));
    await sendAndReceive(parser, {type: 'ready'});
    log('Connected to parser.');
    parser.addEventListener('message', onMessageFromParser);
}

/**
 *
 */
function onMessageFromParser(event) {
    const data = event.data && typeof event.data === 'object' ? event.data : {};
    const {type} = data;
    console.log(`Parent received a "${type}" message!`);
}

/**
 *
 */
async function runParse() {
    const {result} = await sendAndReceive(parser, {type: 'run'});
    parserResult = result;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
setup();
