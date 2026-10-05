import {LANG_MARKER, UID_SEPARATOR} from './CONSTANTS.js';
import add from '../parse/helpers/add.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const GENERAL = 'GENERAL';

const LANG_ORDER = new Set([
    GENERAL,
    'en',
    'pt_br',
    'cs',
    'fr ',
    'de',
    'hu',
    'it',
    'ja',
    'ko',
    'pl',
    'ru',
    'es',
    'tr',
    'uk',
    'zh-hans',
    'zh-hant',
]);

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function printPatch(patchId, patchDate, comparison) {
    const lines = [];
    lines.push('{{PatchDef');
    lines.push(`    | id = ${patchId}`);
    lines.push(`    | date = ${patchDate}`);
    lines.push(`}}`);

    const byLang = splitNotesByLang(comparison);

    for (const lang of LANG_ORDER) {
        const list = byLang[lang];
        if (!list?.length) {
            continue;
        }
        lines.push(`== ${lang} ==<!-- ========================================================= -->`);
        for (const item of list) {
            const def = {};
            add(def, 'patch', patchId);
            add(def, 'id', item.id);
            add(def, 'field', item.field);
            add(def, 'summary', item.summary);
            add(def, 'lang', item.lang);

            lines.push('{{PatchNoteDef');
            for (const key in def) {
                lines.push(`    | ${key} = ${def[key]}`);
            }
            lines.push(`}}`);
        }
    }
    return lines.join('\n');
}

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function splitNotesByLang(comparison) {
    const output = {};
    for (let note of comparison) {
        let {field} = note;
        let lang = GENERAL;
        if (field.startsWith(LANG_MARKER)) {
            field = field.substring(LANG_MARKER.length);
            const parts = field.split(UID_SEPARATOR);
            lang = parts.shift();
            field = parts.join(UID_SEPARATOR);
            note = {
                ...note,
                field,
                lang,
            };
        }
        output[lang] = output[lang] || [];
        output[lang].push(note);
    }
    return output;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default printPatch;
