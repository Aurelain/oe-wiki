import {GENERAL} from './CONSTANTS.js';
import add from '../parse/helpers/add.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const LANG_ORDER = new Set([
    GENERAL,
    'pt_br',
    'cs',
    'en',
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
    for (const lang of LANG_ORDER) {
        const list = comparison[lang];
        if (!list?.length) {
            continue;
        }
        lines.push(`== ${lang} ==<!-- ======================== -->`);
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
//  E X P O R T
// =====================================================================================================================
export default printPatch;
