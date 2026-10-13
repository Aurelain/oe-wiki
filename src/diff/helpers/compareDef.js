import compareValue from './compareValue.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function compareDef(defA = {}, defB = {}) {
    const output = [];
    const fields = new Set([...Object.keys(defA), ...Object.keys(defB)]);
    for (const field of fields) {
        const summary = compareValue(defA[field], defB[field]);
        if (summary !== String(defA[field])) {
            output.push({field, summary});
        }
    }
    return output;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareDef;
