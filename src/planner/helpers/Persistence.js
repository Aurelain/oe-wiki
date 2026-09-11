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
    if (hash) {
        parseSymbols(hash);
    } else {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        parseSymbols(stored || '');
    }
}

/**
 *
 */
function remember(state) {
    const symbols = encode(state);
    parseSymbols(symbols);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function onHashChange() {
    const hash = window.location.hash.substring(1) || '';
    parseSymbols(hash);
}

/**
 *
 */
function parseSymbols(symbols) {
    if (symbols !== sourceOfTruth) {
        sourceOfTruth = symbols;
        window.localStorage.setItem(STORAGE_KEY, symbols);
        if (symbols) {
            window.location.hash = symbols;
        } else {
            // Avoid a jump to top when the hash is empty:
            history.pushState(null, '', window.location.pathname + window.location.search);
        }
        const decoded = decode(symbols);
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
