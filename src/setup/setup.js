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
    const configText = root.innerHTML;
    root.innerHTML = HTML;
    setLogHost(root.querySelector('.' + LOG_HOST));
    log('Initialized.');

    // External scripts:
    const config = parseConfig(configText);
    log('config:', config);
    const worker = importWorker(config.parse);
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
function parseConfig(text) {
    text = text.replaceAll(/<.*?>/g, '');
    try {
        return JSON.parse(text);
    } catch (e) {
        log('!Failed to parse JSON!', e);
        return {};
    }
}

/**
 *
 */
function importWorker(url) {
    log('Loading parser...', url);
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
