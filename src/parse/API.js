import to from './utils/to.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let actuatorFunction;
let addMessageHandler;
let removeMessageHandler;
let postMessageToHost;
let redirectApi;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function initialize(actuator) {
    const hasPreparedEnvironment = await prepareEnvironment();
    if (hasPreparedEnvironment) {
        actuatorFunction = actuator;
        addMessageHandler(onMessageFromParent);
        send('ready');
    }
}

/**
 *
 */
async function find(...args) {
    if (redirectApi) {
        return await redirectApi.find(...args);
    }
    return await sendAndReceive('find', args);
}

/**
 *
 */
function log(...args) {
    if (redirectApi) {
        return redirectApi.log(...args);
    }
    send('log', args);
}

/**
 *
 */
function redirect(otherApi) {
    redirectApi = otherApi;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function prepareEnvironment() {
    const isNode = typeof process !== 'undefined' && process.versions?.node !== null;
    if (isNode) {
        const nodeWorkerModule = 'node:worker_threads'; // hide the import from ESLint
        const {parentPort} = await import(nodeWorkerModule);
        if (!parentPort) {
            // throw new Error('No parent port!');
            return;
        }
        addMessageHandler = (fn) => parentPort.on('message', fn);
        removeMessageHandler = (fn) => parentPort.off('message', fn);
        postMessageToHost = (data) => parentPort.postMessage(data);
    } else {
        addMessageHandler = (fn) => self.addEventListener('message', fn);
        removeMessageHandler = (fn) => self.removeEventListener('message', fn);
        postMessageToHost = (data) => self.postMessage(data);
    }
    return true;
}

/**
 *
 */
async function onMessageFromParent(eventOrData) {
    const data = eventOrData?.data || eventOrData;
    const {type} = data;
    switch (type) {
        case 'run':
            // console.log(`Child received a "${type}" inquiry.`);
            const [result, error] = await to(actuatorFunction);
            if (error) {
                const extra = error.extra || [];
                log('!Error encountered while parsing!', error.message, ...extra);
                send('run', {});
            } else {
                send('run', result);
            }
            break;
        default:
        // nothing
    }
}

/**
 *
 */
function send(type, payload) {
    postMessageToHost({type, payload});
}

/**
 *
 */
async function sendAndReceive(type, payload) {
    return new Promise((resolve) => {
        const listener = (eventOrData) => {
            const data = eventOrData?.data || eventOrData;
            if (data.type === type) {
                // console.log(`Child received a "${type}" reply.`);
                removeMessageHandler(listener);
                resolve(data.payload);
            }
        };
        addMessageHandler(listener);
        postMessageToHost({type, payload});
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
const API = {
    initialize,
    find,
    log,
    redirect,
};
export default API;
