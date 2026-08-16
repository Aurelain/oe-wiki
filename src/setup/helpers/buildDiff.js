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
import on from '../utils/on.js';

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
        } else {
            fresh = convertSymbols(fresh);
        }
        const items = buildFile(key, old, fresh);
        lines.push(...items);
    }
    hostElement.innerHTML = lines.join('');
    const titles = Array.from(hostElement.querySelectorAll('.' + DIFF_PATH));
    on('click', titles, onPathClick);
    scrollToFirstUncollapsed(hostElement);
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

/**
 *
 */
function convertSymbols(text) {
    return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;');
}

/**
 *
 */
function onPathClick(event) {
    const content = event.currentTarget.nextElementSibling;
    content.classList.toggle(DIFF_COLLAPSED);
}

/**
 *
 */
function scrollToFirstUncollapsed(hostElement) {
    const pathElements = hostElement.querySelectorAll('.' + DIFF_PATH);
    for (const pathElement of pathElements) {
        if (!pathElement.nextElementSibling.classList.contains(DIFF_COLLAPSED)) {
            pathElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            break;
        }
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default buildDiff;
