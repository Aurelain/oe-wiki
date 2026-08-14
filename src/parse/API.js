let actuatorFunction;

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function initialize(actuator) {
    actuatorFunction = actuator;
    self.onmessage = onMessageFromParent;
    self.postMessage({type: 'ready'});
}

/**
 *
 */
async function list() {
    return [];
}

/**
 *
 */
async function read(key) {
    return '';
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
    console.log(`Child received a "${type}" message!`);
    switch (type) {
        case 'run':
            const result = await actuatorFunction();
            self.postMessage({type: 'run', result});
            break;
        default:
        // nothing
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
const API = {
    initialize,
    list,
    read,
};
export default API;
