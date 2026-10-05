import match from '../utils/match.js';
import log from '../utils/log.js';
import {LANG_MARKER, UID_SEPARATOR} from './CONSTANTS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ID_BLACKLIST = /campaign|arena/;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function buildHub(pathToContent) {
    const list = [];
    for (const path in pathToContent) {
        const defs = parseDefFile(pathToContent[path]);
        list.push(...defs);
    }

    const hub = {};
    for (const item of list) {
        const {meta, id, ...def} = item;
        if (!id) {
            log('Definition lacks id!', meta.raw);
            continue;
        }
        if (id.match(ID_BLACKLIST)) {
            continue;
        }
        const entry = hub[id] || {};
        for (const field in def) {
            if (field in entry) {
                log(`Field "${field}" already exists!`, meta.raw, entry);
                continue;
            }
            entry[field] = def[field];
        }
        hub[id] = entry;
    }
    return hub;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseDefFile(content) {
    const defs = [];
    const foundDefs = match(content, /\{\{(.*?Def)([\s\S]*?)}}/g);
    for (const foundDef of foundDefs) {
        const raw = foundDef[0];
        const name = foundDef[1];
        const inner = foundDef[2];
        const linesFound = match(inner, /\|(.*?)=([^|]*)/g);
        const meta = {name, raw};
        const def = {};
        for (const lineFound of linesFound) {
            const [, key, value] = lineFound;
            def[key.trim()] = value.trim();
        }
        const improvedDef = improveDef(def, meta);
        if (improvedDef) {
            defs.push(improvedDef);
        }
    }
    return defs;
}

/**
 *
 */
function improveDef(def, meta) {
    let output;
    switch (meta.name) {
        case 'TranslationDef':
            output = spawnImprovedTranslationDef(def);
            break;
        case 'BonusDef':
            output = spawnImprovedBonusDef(def);
            break;
        case 'SkillLevelDef':
            output = spawnImprovedSkillLevelDef(def);
            break;
        default:
            output = {...def};
    }
    output.meta = meta;
    return output;
}

/**
 * {TranslationDef
 * | target_id = sub_skill_summoner_6_old
 * | type = sub_skill
 * | language = en
 * | name = Fields of Mana
 * | description = Using spells, the hero can summon creatures onto any free hex.
 * }
 */
function spawnImprovedTranslationDef(def) {
    const {target_id, type, subtype, variant, language, ...rest} = def;
    const uid = LANG_MARKER + buildUid(language, type, subtype, variant);
    const fresh = {
        id: target_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {BonusDef
 * | parent_type = sub_skill
 * | parent_id = sub_skill_movePoints
 * | ordinal = 0
 * | type = heroStat
 * | parameters = movementPerBonus,0.10
 * }
 */
function spawnImprovedBonusDef(def) {
    const {parent_id, parent_type, ordinal, type, ...rest} = def;
    const uid = buildUid(parent_type, ordinal, type);
    const fresh = {
        id: parent_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {SkillLevelDef
 * | skill_id = skill_assault
 * | level = 1
 * | name_sid = skill_assault_name_1
 * | desc_sid = skill_assault_desc
 * | icon = skill_assault
 * }
 */
function spawnImprovedSkillLevelDef(def) {
    const {skill_id, level, ...rest} = def;
    const uid = buildUid('level', level);
    const fresh = {
        id: skill_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 *
 */
function buildUid(...args) {
    const truthy = args.filter((item) => Boolean(item));
    return truthy.join(UID_SEPARATOR);
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default buildHub;
