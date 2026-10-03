import to from './utils/to.js';
import findFiles from './helpers/findFiles.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let actuatorFunction;
let addMessageHandler;
let removeMessageHandler;
let postMessageToHost;
let gameDir;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function initialize(actuator, forcedGameDir = '') {
    if (forcedGameDir) {
        gameDir = forcedGameDir;
        const results = await actuator();
        console.log('Parsed count:', Object.values(results).length);
        return;
    }
    await detectEnvironment();
    actuatorFunction = actuator;
    addMessageHandler(onMessageFromParent);
    send('ready');
}

/**
 *
 */
async function find(...args) {
    if (!gameDir) {
        return await sendAndReceive('find', args);
    } else {
        const [pattern, exclude, onlyFirstResult] = args;
        const result = await findFiles(gameDir, pattern, exclude, onlyFirstResult);
        return result;
    }
}

/**
 *
 */
function log(...args) {
    if (!gameDir) {
        send('log', args);
    } else {
        console.log(...args);
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function detectEnvironment() {
    const isNode = typeof process !== 'undefined' && process.versions?.node !== null;
    if (isNode) {
        const nodeWorkerModule = 'node:worker_threads'; // hide the import from ESLint
        const {parentPort} = await import(nodeWorkerModule);
        if (!parentPort) {
            throw new Error('No parent port!');
        }
        addMessageHandler = (fn) => parentPort.on('message', fn);
        removeMessageHandler = (fn) => parentPort.off('message', fn);
        postMessageToHost = (data) => parentPort.postMessage(data);
    } else {
        addMessageHandler = (fn) => self.addEventListener('message', fn);
        removeMessageHandler = (fn) => self.removeEventListener('message', fn);
        postMessageToHost = (data) => self.postMessage(data);
    }
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
};
export default API;
