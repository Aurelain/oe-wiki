import to from './utils/to.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let actuatorFunction;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function initialize(actuator) {
    actuatorFunction = actuator;
    self.addEventListener('message', onMessageFromParent);
    send('ready');
}

/**
 *
 */
async function find(...args) {
    return await sendAndReceive('find', args);
}

/**
 *
 */
function log(...args) {
    send('log', args);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function onMessageFromParent(event) {
    const data = event.data && typeof event.data === 'object' ? event.data : {};
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
    self.postMessage({type, payload});
}

/**
 *
 */
async function sendAndReceive(type, payload) {
    return new Promise((resolve) => {
        const listener = (event) => {
            const data = event.data && typeof event.data === 'object' ? event.data : {};
            if (data.type === type) {
                // console.log(`Child received a "${type}" reply.`);
                self.removeEventListener('message', listener);
                resolve(data.payload);
            }
        };
        self.addEventListener('message', listener);
        self.postMessage({type, payload});
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
