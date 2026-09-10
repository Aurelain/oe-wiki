import decode from './compression/decode.js';
import encode from './compression/encode.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const STORAGE_KEY = 'hero-planner';
let changeHandler;
let sourceOfTruth = null; // base62. Setting this to `null` ensures that `changeHandler()` always triggers after setup.

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function setup(onChange) {
    changeHandler = onChange;
    window.addEventListener('hashchange', onHashChange);

    const hash = window.location.hash.substring(1);
    console.log('hash:', hash);
    if (hash) {
        parseHash();
    } else {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
            window.location.hash = stored; // will trigger an `onHashChange()`
        } else {
            parseHash();
        }
    }
}

/**
 *
 */
function remember(state) {
    const symbols = encode(state);
    if (symbols !== sourceOfTruth) {
        save(symbols);
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function onHashChange() {
    parseHash();
}

/**
 *
 */
function save(symbols) {
    sourceOfTruth = symbols;
    window.localStorage.setItem(STORAGE_KEY, symbols);
    window.location.hash = symbols;
}

/**
 *
 */
function parseHash() {
    const hash = window.location.hash.substring(1) || '';
    if (hash !== sourceOfTruth) {
        save(hash);
        const decoded = decode(hash);
        console.log('decoded:', decoded);
        changeHandler(decoded);
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
const Persistence = {
    setup,
    remember,
};
export default Persistence;
