import HTML_USER from './html/HTML_USER.js';
import log, {setLogHost} from './log.js';
import {BTN_GAME, BTN_MIRROR, IS_GRANTED, LOG_HOST} from './SETTINGS.js';
import HTML_DEV from './html/HTML_DEV.js';
import on from './utils/on.js';
import {readFromDb, writeToDb} from './utils/LocalDb.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const GAME_DIR_HANDLE = 'gameDirHandle';
const MIRROR_DIR_HANDLE = 'mirrorDirHandle';
let parseResults;

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

    return;

    // Import parser:
    const worker = importWorker(parsePath);
    setTimeout(() => {
        log('Sending foo...');
        worker.postMessage('foo');
    }, 1000);

    if (isDev) {
        // await runParse();
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
function importWorker(url) {
    log('Loading parser', url);
    const worker = new Worker(`data:application/javascript,importScripts('${url}');`);
    worker.onmessage = (event) => {
        console.log('Received result:', event.data);
    };
    return worker;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
setup();
