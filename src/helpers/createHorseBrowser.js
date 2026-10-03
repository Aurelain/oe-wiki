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
            console.log('createHorseBrowser.run:');
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
    console.log('workerUrl:', workerUrl);
    const worker = new Worker(`data:application/javascript,importScripts('${workerUrl}?${Math.random()}');`);
    worker.addEventListener('error', () => ApiReference.log('!Worker error!'));
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
async function onWorkerMessage(worker, data) {
    const ApiReference = workers.get(worker);
    const {type, payload} = data;
    if (typeof ApiReference[type] !== 'function') {
        return;
    }
    const result = ApiReference[type](payload);
    if (result !== undefined) {
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
                console.log(`Parent received a "${type}" reply.`);
                worker.removeEventListener('message', listener);
                resolve(data.payload);
            }
        };
        worker.addEventListener('message', listener);
        worker.postMessage({type, payload});
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default createHorseBrowser;
