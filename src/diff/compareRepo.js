import compareHub from './compareHub.js';
import {ADDED, GENERAL, REMOVED} from './CONSTANTS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function compareRepo(repoA, repoB) {
    const output = {};
    for (const lang in repoA) {
        const list = compareHub(repoA[lang], repoB[lang]);
        const listWithLang = addLangFieldToList(list, lang);
        output[lang] = output[lang] || [];
        output[lang].push(...listWithLang);
    }
    for (const lang in repoB) {
        if (!repoA.hasOwnProperty(lang)) {
            const list = compareHub(repoA[lang], repoB[lang]);
            const listWithLang = addLangFieldToList(list, lang);
            output[lang] = output[lang] || [];
            output[lang].push(...listWithLang);
        }
    }
    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function addLangFieldToList(list, lang) {
    if (lang === GENERAL) {
        return list;
    }
    const output = [];
    for (const item of list) {
        if (item.summary !== REMOVED && item.summary !== ADDED) {
            output.push({
                ...item,
                lang,
            });
        }
    }
    return output;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareRepo;
