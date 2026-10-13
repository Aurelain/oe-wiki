import to from '../parse/utils/to.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const workers = new Map();

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
async function createHorseBrowser(workerUrl, ApiReference) {
    const worker = await loadWorker(workerUrl, ApiReference);
    workers.set(worker, ApiReference);
    worker.addEventListener('message', onWorkerMessage.bind(null, worker));
    return {
        run: async () => {
            return await sendAndReceive(worker, 'run');
        },
    };
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function loadWorker(workerUrl, ApiReference) {
    let worker;
    if (window.mw) {
        worker = await createWikiWorker(workerUrl, ApiReference);
    } else {
        worker = new Worker(`data:application/javascript,importScripts('${workerUrl}?${Math.random()}');`);
    }
    if (worker) {
        worker.addEventListener('error', () => ApiReference.log('!Worker error!'));
    }
    return new Promise((resolve) => {
        const listener = (event) => {
            const data = event.data && typeof event.data === 'object' ? event.data : {};
            if (data.type === 'ready') {
                worker.removeEventListener('message', listener);
                resolve(worker);
            }
        };
        worker.addEventListener('message', listener);
    });
}

/**
 *
 */
async function onWorkerMessage(worker, event) {
    const ApiReference = workers.get(worker);
    const {type, payload} = event.data;
    // console.log(`Parent received "${type}".`);
    if (typeof ApiReference[type] !== 'function') {
        return;
    }
    const [result, error] = await to(ApiReference[type], ...payload);
    if (!error) {
        // console.log(`Parent sends the result of "${type}".`);
        worker.postMessage({type, payload: result});
    }
}

/**
 *
 */
async function sendAndReceive(worker, type, payload) {
    return new Promise((resolve) => {
        const listener = (event) => {
            const data = event.data && typeof event.data === 'object' ? event.data : {};
            if (data.type === type) {
                // console.log(`Parent received the result of "${type}".`);
                worker.removeEventListener('message', listener);
                resolve(data.payload);
            }
        };
        worker.addEventListener('message', listener);
        // console.log(`Parent sends "${type}" and waits...`);
        worker.postMessage({type, payload});
    });
}

/**
 *
 */
async function createWikiWorker(pageTitle, ApiReference) {
    // 1. Fetch raw JS using the MediaWiki action=raw endpoint
    const rawUrl = mw.util.getUrl(pageTitle, {
        action: 'raw',
        ctype: 'text/javascript',
        v: Date.now(),
    });

    const response = await fetch(rawUrl, {cache: 'no-cache'});
    if (!response.ok) {
        ApiReference.log('!Failed to load wiki worker!', response.statusText);
        return;
    }
    const workerCode = await response.text();

    // 2. Wrap the code in a Blob and create a local Object URL
    const blob = new Blob([workerCode], {type: 'application/javascript'});
    const blobUrl = URL.createObjectURL(blob);

    // 3. Instantiate the Worker
    const worker = new Worker(blobUrl);

    // 4. Revoke the Object URL to avoid memory leaks
    URL.revokeObjectURL(blobUrl);

    return worker;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default createHorseBrowser;
