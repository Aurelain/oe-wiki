import {render} from 'preact';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let parameters;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function mount(App, selector, importance = 0, props = {}) {
    parameters = {App, selector, importance, props};
    if (attemptMount() === false) {
        window.addEventListener('load', onWindowLoad);
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function onWindowLoad() {
    window.removeEventListener('load', onWindowLoad);
    attemptMount();
}

/**
 *
 */
function attemptMount() {
    const {App, selector, importance, props} = parameters;
    const root = document.querySelector(selector);
    if (!root) {
        return false;
    }

    const existingImportance = root.dataset.importance;
    if (existingImportance) {
        if ((Number(existingImportance) || 0) >= importance) {
            console.warn('Refused to mount, not important enough!');
            return;
        }
    }

    root.dataset.importance = importance;
    root.innerHTML = '';
    render(<App {...props} />, root);
    return true;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default mount;
