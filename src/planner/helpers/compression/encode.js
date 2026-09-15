import FIELDS from './FIELDS.js';
import assume from '../../utils/assume.js';
import {FIELD_INDEX_BITS, SYMBOLS} from './SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * The field values are stored sequentially in bits according to the `bits` property in FIELDS.
 * Each value is preceded by a single bit that tells us if this value is really the one next in order (1) or
 * we have to jump to a specific index (0). If we do have to jump, what follows is a 6-bit integer representing
 * the index we jump to.
 */
function encode(hub) {
    let stream = '';
    let jumpPending = false;
    for (let i = 0; i < FIELDS.length; i++) {
        const {key, bits, dictionary} = FIELDS[i];
        let value = hub[key];
        if (!value) {
            jumpPending = true;
            continue;
        }
        if (jumpPending) {
            stream += '0';
            stream += i.toString(2).padStart(FIELD_INDEX_BITS, '0');
            jumpPending = false;
        } else {
            stream += '1';
        }
        if (dictionary) {
            // The value is a token from the dictionary
            const index = dictionary.indexOf(value);
            assume(index >= 0, `The value "${value}" is not present in the dictionary of "${key}"!`);
            value = index;
        }
        stream += value.toString(2).padStart(bits, '0');
    }
    return convertBitsToSymbols(stream);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function convertBitsToSymbols(bits) {
    if (!bits) {
        return '';
    }
    let num = BigInt('0b1' + bits);
    let res = '';
    const base = BigInt(SYMBOLS.length);
    while (num > 0n) {
        res = SYMBOLS[Number(num % base)] + res;
        num /= base;
    }
    return res;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default encode;
