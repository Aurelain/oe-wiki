import {ADDED, REMOVED} from './CONSTANTS.js';
import compareValue from './compareValue.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function compareDef(defA, defB) {
    if (!defA) {
        return [{summary: ADDED}];
    }
    if (!defB) {
        return [{summary: REMOVED}];
    }
    const output = [];
    for (const field in defA) {
        const summary = compareValue(defA[field], defB[field]);
        output.push({field, summary});
    }
    for (const field in defB) {
        if (!defA.hasOwnProperty(field)) {
            const summary = compareValue(undefined, defB[field]);
            output.push({field, summary});
        }
    }
    return output;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareDef;
