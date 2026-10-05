import match from '../utils/match.js';
import log from '../utils/log.js';
import {LANG_MARKER, UID_SEPARATOR} from './CONSTANTS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ID_BLACKLIST = /campaign|arena|tutorial/;
const SPAWNERS = {
    TranslationDef: spawnTranslationDef,
    BonusDef: spawnBonusDef,
    SkillLevelDef: spawnSkillLevelDef,
    EntryDef: null,
    AttackPassiveDef: null,
    LawTreePositionDef: spawnLawTreePositionDef,
    FactionLawTierDef: null,
    HeroStartSquadDef: spawnHeroStartSquadDef,
    LawLevelDef: spawnLawLevelDef,
    SkillRollReplacementDef: null,
    SpellRankDef: spawnSpellRankDef,
    SkillRollWeightDef: spawnSkillRollWeightDef,
    StatBonusRollDef: spawnStatBonusRollDef,
    UnitAbilityActiveDef: spawnUnitAbilityDef,
    UnitAttackDef: spawnUnitAttackDef,
    UnitAbilityPassiveDef: spawnUnitAbilityDef,
    UnitAbilityConditionalDef: spawnUnitAbilityDef,
    UnitAbilityGlobalDef: spawnUnitAbilityDef,
    UnitAbilityAuraDef: spawnUnitAbilityDef,
};

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
    const spawner = SPAWNERS[meta.name];
    if (spawner === null) {
        return;
    }
    const improvedDef = spawner ? spawner(def) : {...def};
    if (!improvedDef) {
        return;
    }
    improvedDef.meta = meta;
    return improvedDef;
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
function spawnTranslationDef(def) {
    let {target_id, type, subtype, variant, language, ...rest} = def;
    const uid = LANG_MARKER + buildUid(language, type, subtype, variant);
    const fresh = {
        id: target_id.replace('_specialization', ''),
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
function spawnBonusDef(def) {
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
function spawnSkillLevelDef(def) {
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
 * {LawTreePositionDef
 * | faction = human
 * | tier = 1
 * | side = army
 * | slot = 0
 * | law_id = fraction_law_human_4
 * }
 */
function spawnLawTreePositionDef(def) {
    const {law_id, ...rest} = def;
    const uid = 'tree';
    const fresh = {
        id: law_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {HeroStartSquadDef
 * | hero_id = campaign_hero_1
 * | variant = primary
 * | slot = 1
 * | unit_id = minos
 * | min = 5
 * | max = 5
 * }
 */
function spawnHeroStartSquadDef(def) {
    const {hero_id, variant, slot, ...rest} = def;
    const uid = buildUid('squad', variant, slot);
    const fresh = {
        id: hero_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {{LawLevelDef
 * | law_id = fraction_law_demon_1
 * | level = 2
 * | cost = 2
 * }
 */
function spawnLawLevelDef(def) {
    const {law_id, level, ...rest} = def;
    const uid = buildUid('level', level);
    const fresh = {
        id: law_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {SpellRankDef
 * | spell_id = bonus_magic_astral_summon_nature_3
 * | level = 3
 * | description_sid = bonus_magic_astral_summon_new_description_3
 * | mana_cost = 0
 * | upgrade_cost = 10
 * }
 */
function spawnSpellRankDef(def) {
    const {spell_id, level, ...rest} = def;
    const uid = buildUid('level', level);
    const fresh = {
        id: spell_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {SkillRollWeightDef
 * | table_id = nature_might_skills_table
 * | band_kind = default
 * | skill_id = skill_summoner
 * | weight = 50
 * }
 */
function spawnSkillRollWeightDef(def) {
    const {skill_id, table_id, band_kind, ...rest} = def;
    const uid = buildUid('roll', table_id, band_kind);
    const fresh = {
        id: skill_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {StatBonusRollDef
 * | id = skill_pseudo_12
 * | stat = intelligence
 * | magnitude = 3
 * | weight = 5
 * | name_sid = skill_pseudo_name
 * | desc_sid = skill_pseudo_12_desc
 * }
 */
function spawnStatBonusRollDef(def) {
    const {name_sid, desc_sid, ...rest} = def;
    return rest;
}

/**
 * {{UnitAbilityActiveDef
 * | ability_id = dragon_1
 * | unit_id = dragon
 * | ability_type = active
 * | ordinal = 1
 * | name_sid = dragon_ability_1_name
 * | desc_sid = dragon_ability_1_description
 * | active_type = Ability_type_attack
 * }}
 */
function spawnUnitAbilityDef(def) {
    const {unit_id, ordinal, ability_type, ...rest} = def;
    if (!unit_id) {
        return;
    }
    const uid = buildUid('ability', ability_type, ordinal);
    const fresh = {
        id: unit_id,
    };
    for (const field in rest) {
        fresh[uid + UID_SEPARATOR + field] = rest[field];
    }
    return fresh;
}

/**
 * {{UnitAttackDef
 * | unit_id = dragon
 * | default_attack_type = melee_attack
 * | default_damage_target = all
 * | default_affect_target = noself
 * | counter_attack_type = melee_attack
 * | counter_damage_target = all
 * | counter_affect_target = noself
 * }}
 */
function spawnUnitAttackDef(def) {
    const {unit_id, ...rest} = def;
    return {
        id: unit_id,
        ...rest,
    };
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
