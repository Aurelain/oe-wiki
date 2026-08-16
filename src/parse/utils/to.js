// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function to(target, ...args) {
    // Case 1: Synchronous function
    if (typeof target === 'function') {
        try {
            const result = target(...args);
            // Check if the returned result is a Promise
            if (result && typeof result.then === 'function') {
                return result.then((data) => [data, null]).catch((err) => [null, err]);
            }
            return [result, null];
        } catch (err) {
            return [null, err];
        }
    }

    // Case 2: Direct Promise passed in
    if (target && typeof target.then === 'function') {
        return target.then((data) => [data, null]).catch((err) => [null, err]);
    }

    return [target, null];
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default to;
