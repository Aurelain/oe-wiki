import HTML from './html/HTML.js';
import log, {setLogHost} from './log.js';
import {BTN_GAME, LOG_HOST} from './SETTINGS.js';
import HTML_DEV from './html/HTML_DEV.js';
import on from './utils/on.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

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
    root.innerHTML = isDev ? HTML_DEV : HTML;
    setLogHost(root.querySelector('.' + LOG_HOST));
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
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function addEvents() {
    on('click', '.' + BTN_GAME, onGameClick);
}

/**
 *
 */
async function onGameClick() {
    let dirHandle;
    try {
        dirHandle = await window.showDirectoryPicker({mode: 'read'});
    } catch (e) {}
    console.log('dirHandle:', dirHandle);
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
