import HTML from './HTML.js';
import log, {setLogHost} from './log.js';
import {LOG_HOST} from './SETTINGS.js';

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

    // Markup:
    root.innerHTML = HTML;
    setLogHost(root.querySelector('.' + LOG_HOST));
    log('Initialized.');

    // Import parser:
    // const isDev = root.dataset.dev === '1';
    const parsePath = root.dataset.parse;
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
