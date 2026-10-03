import worker_threads from 'node:worker_threads';

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
async function createHorseNode(workerPath, ApiReference) {
    const worker = await loadWorker(workerPath, ApiReference);
    workers.set(worker, ApiReference);
    worker.on('message', onWorkerMessage.bind(null, worker));
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
async function loadWorker(workerPath, ApiReference) {
    const worker = new worker_threads.Worker(workerPath);
    worker.on('error', () => ApiReference.log('!Worker error!'));
    return new Promise((resolve) => {
        const listener = (data) => {
            if (data?.type === 'ready') {
                worker.off('message', listener);
                resolve(worker);
            }
        };
        worker.on('message', listener);
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
//  E X P O R T
// =====================================================================================================================
export default createHorseNode;
