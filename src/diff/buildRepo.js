import {GENERAL} from './CONSTANTS.js';
import match from '../utils/match.js';
import log from '../utils/log.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const KEY_TRANSLATION = {
    target_id: 'id',
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function buildRepo(hubPathToContent) {
    const list = [];
    for (const path in hubPathToContent) {
        const items = parseDefFile(hubPathToContent[path]);
        list.push(...items);
    }
    const repo = {};
    for (const item of list) {
        const {id, language, ...def} = item;
        if (!id) {
            log('Definition lacks id!', item);
            continue;
        }
        const lang = language || GENERAL;
        repo[lang] = repo[lang] || {};
        if (repo[lang][id]) {
            log('Duplicate id!', item);
            continue;
        }
        repo[lang][id] = def;
    }
    return repo;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseDefFile(content) {
    const defs = [];
    const foundDefs = match(content, /\{\{.*?Def([\s\S]*?)}}/g);
    for (const foundDef of foundDefs) {
        const inner = foundDef[1];
        const linesFound = match(inner, /\|(.*?)=([^|]*)/g);
        const def = {};
        for (const lineFound of linesFound) {
            const [, key, value] = lineFound;
            const adaptedKey = adaptKey(key);
            def[adaptedKey] = value.trim();
        }
        defs.push(def);
    }
    return defs;
}

/**
 *
 */
function adaptKey(key) {
    key = key.trim();
    return KEY_TRANSLATION[key] || key;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default buildRepo;
