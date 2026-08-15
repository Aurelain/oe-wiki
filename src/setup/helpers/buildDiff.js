import compareTexts from '../utils/compareTexts.js';
import {
    DIFF_CHANGED,
    DIFF_COLLAPSED,
    DIFF_CONTENT,
    DIFF_IDENTICAL,
    DIFF_LABEL,
    DIFF_NEW,
    DIFF_PATH,
} from '../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const LABELS = {
    [DIFF_NEW]: 'new',
    [DIFF_IDENTICAL]: 'identical',
    [DIFF_CHANGED]: 'changed',
};
// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function buildDiff(oldHub, freshHub, hostElement) {
    const lines = [];
    for (const key in freshHub) {
        let fresh = freshHub[key];
        let old = oldHub[key];
        if (old !== undefined) {
            const {text1, text2} = compareTexts(old, fresh);
            old = text1;
            fresh = text2;
        }
        const items = buildFile(key, old, fresh);
        lines.push(...items);
    }
    hostElement.innerHTML = lines.join('\n');
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function buildFile(path, oldText, freshText) {
    const statusClass = oldText === undefined ? DIFF_NEW : oldText === freshText ? DIFF_IDENTICAL : DIFF_CHANGED;
    const label = `<div class="${DIFF_LABEL}">${LABELS[statusClass]}</div>`;
    const collapsedClass = statusClass === DIFF_IDENTICAL ? DIFF_COLLAPSED : '';

    const output = [];
    output.push(`<div class="${DIFF_PATH} ${statusClass}">${label}${path}</div>`);
    output.push(`<div class="${DIFF_CONTENT} ${collapsedClass}">`);
    if (statusClass === DIFF_CHANGED) {
        output.push(`<pre>${oldText}</pre>`);
    }
    output.push(`<pre>${freshText}</pre>`);
    output.push(`</div>`);
    return output;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default buildDiff;
