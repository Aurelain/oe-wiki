import compareHub from './compareHub.js';
import {GENERAL} from './CONSTANTS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function compareRepo(repoA = {}, repoB = {}) {
    const output = {};

    // Handle removed ids:
    const removedIds = findRemovedIds(repoA, repoB);
    output[GENERAL] = [];
    for (const removedId of removedIds) {
        output[GENERAL].push({id: removedId, summary: 'REMOVED'});
    }

    // Normal comparison:
    const langs = new Set([...Object.keys(repoA), ...Object.keys(repoB)]);
    for (const lang of langs) {
        const entries = [];
        const list = compareHub(repoA[lang], repoB[lang]);
        for (const item of list) {
            const {id} = item;
            if (removedIds.has(id)) {
                continue;
            }
            const draft = {...item};
            if (lang !== GENERAL) {
                draft.lang = lang;
            }
            entries.push(draft);
        }
        output[lang] = output[lang] || [];
        output[lang].push(...entries);
    }

    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function findRemovedIds(repoA, repoB) {
    const output = new Set();
    const allIdsA = findAllIds(repoA);
    const allIdsB = findAllIds(repoB);
    for (const id of allIdsA) {
        if (!allIdsB.has(id)) {
            output.add(id);
        }
    }
    return output;
}
/**
 *
 */
function findAllIds(repo) {
    const ids = new Set();
    for (const lang in repo) {
        for (const id in repo[lang]) {
            ids.add(id);
        }
    }
    return ids;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareRepo;
