import createHorseNode from './createHorseNode.js';
import createHorseBrowser from './createHorseBrowser.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
async function createHorse(pathOrFunction, ApiReference) {
    if (typeof pathOrFunction === 'string') {
        const path = pathOrFunction;
        const isNode = typeof process !== 'undefined' && process.versions?.node !== null;
        if (isNode) {
            return await createHorseNode(path, ApiReference);
        } else {
            return await createHorseBrowser(path, ApiReference);
        }
    } else {
        const fn = pathOrFunction;
        return await createHorseFromFunction(fn, ApiReference);
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function createHorseFromFunction(fn, ApiReference) {
    return {
        run: () => {
            return fn(ApiReference);
        },
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default createHorse;
