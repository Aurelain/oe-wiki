import API from './API.js';
import unzipCore from './helpers/unzipCore.js';
import {buildCache} from './helpers/translate.js';

// Parsers:
import Artifact from './parsers/Artifact.js';
import AstrologistEvent from './parsers/AstrologistEvent.js';
import AttackArchetype from './parsers/AttackArchetype.js';
import AttackPassive from './parsers/AttackPassive.js';
import Building from './parsers/Building.js';
import CreatureType from './parsers/CreatureType.js';
import Difficulty from './parsers/Difficulty.js';
import Faction from './parsers/Faction.js';
import Hero from './parsers/Hero.js';
import HeroClass from './parsers/HeroClass.js';
import HeroSpecialization from './parsers/HeroSpecialization.js';
import HeroStat from './parsers/HeroStat.js';
import HeroSubClass from './parsers/HeroSubClass.js';
import ItemSet from './parsers/ItemSet.js';
import Law from './parsers/Law.js';
import MapObject from './parsers/MapObject.js';
import Movement from './parsers/Movement.js';
import Resource from './parsers/Resource.js';
import Skill from './parsers/Skill.js';
import SkillRollBand from './parsers/SkillRollBand.js';
import SkillRollReplacement from './parsers/SkillRollReplacement.js';
import SkillRollTable from './parsers/SkillRollTable.js';
import Spell from './parsers/Spell.js';
import StatBonusRoll from './parsers/StatBonusRoll.js';
import UI from './parsers/UI.js';
import UiLabel from './parsers/UiLabel.js';
import Unit from './parsers/Unit.js';
import UnitLabels from './parsers/UnitLabels.js';
import UnitShared from './parsers/UnitShared.js';
import UnitStat from './parsers/UnitStat.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const DEBUG = new Set([
    // -- Use this to focus on only some parsers:
    // Difficulty,
]);

const PARSERS = [
    Artifact,
    AstrologistEvent,
    AttackArchetype,
    AttackPassive,
    Building,
    CreatureType,
    Difficulty,
    Faction,
    Hero,
    HeroClass,
    HeroSpecialization,
    HeroStat,
    HeroSubClass,
    ItemSet,
    Law,
    MapObject,
    Movement,
    Resource,
    Skill,
    SkillRollBand,
    SkillRollReplacement,
    SkillRollTable,
    Spell,
    StatBonusRoll,
    UI,
    UiLabel,
    Unit,
    UnitLabels,
    UnitShared,
    UnitStat,
];
// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function parse() {
    const zipHub = await unzipCore();
    buildCache(zipHub);

    const results = {};
    for (const parser of PARSERS) {
        if (!DEBUG.size || DEBUG.has(parser)) {
            Object.assign(results, parser(zipHub));
        }
    }

    const output = {};
    for (const key in results) {
        const path = 'Data/' + key + '.wiki';
        output[path] = prepareContent(results[key]);
    }

    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function prepareContent(parsingResult) {
    const parts = [];
    parts.push(`<!-- Bot-managed page. Edit the source in obelisk-bot, not here. -->`);
    parsingResult.comment && parts.push(parsingResult.comment);
    for (const def of parsingResult) {
        parts.push(convertDefinitionToTemplate(def));
    }
    parts.push(`[[Category:Game Data Import]]`);
    return parts.join('\n\n').trim();
}

/**
 *
 */
function convertDefinitionToTemplate(definition) {
    const lines = [];
    lines.push(`{{${definition._type}`);
    delete definition._type; // mutation
    for (const key in definition) {
        lines.push(`| ${key.trim()} = ${convertValue(definition[key])}`);
    }
    lines.push('}}');
    return lines.join('\n');
}

/**
 *
 */
function convertValue(value) {
    switch (typeof value) {
        case 'boolean':
            return value ? 'yes' : 'no';
        case 'string':
            return value; // value.trim(); // TODO: restore trim
        case 'number':
            return value.toString();
        default:
            if (Array.isArray(value)) {
                return value.join(',');
            } else {
                API.log('Unexpected value type!', typeof value, value);
                return String(value);
            }
    }
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
API.initialize(parse);
export default parse;
