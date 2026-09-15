import match from '../utils/match.js';
import downloadPage from '../helpers/downloadPage.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getHeroClasses() {
    const overview = await downloadPage('Special:CargoTables/HeroClass');
    const rows = overview.split('</tr>');
    rows.shift(); // remove the header

    const heroClasses = {};
    for (const row of rows) {
        const heroClass = parseRow(row);

        if (checkValid(heroClass)) {
            heroClasses[heroClass.id] = heroClass;
        }
    }
    console.log('heroClasses:', heroClasses);

    return heroClasses;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseRow(row) {
    // console.log('row:', row);

    const [, id] = match(row, /field_id.*?>([^<]*)/);
    const [, attack] = match(row, /field_offence.*?>([^<]*)/);
    const [, defense] = match(row, /field_defence.*?>([^<]*)/);
    const [, spellPower] = match(row, /field_spell_power.*?>([^<]*)/);
    const [, knowledge] = match(row, /field_intelligence.*?>([^<]*)/);
    const [, luck] = match(row, /field_luck.*?>([^<]*)/);
    const [, morale] = match(row, /field_morale.*?>([^<]*)/);
    const [, roll1Attack] = match(row, /field_roll_lvl1_attack.*?>([^<]*)/);
    const [, roll1Defense] = match(row, /field_roll_lvl1_defense.*?>([^<]*)/);
    const [, roll1Power] = match(row, /field_roll_lvl1_power.*?>([^<]*)/);
    const [, roll1Knowledge] = match(row, /field_roll_lvl1_knowledge.*?>([^<]*)/);
    const [, roll24Attack] = match(row, /field_roll_lvl24_attack.*?>([^<]*)/);
    const [, roll24Defense] = match(row, /field_roll_lvl24_defense.*?>([^<]*)/);
    const [, roll24Power] = match(row, /field_roll_lvl24_power.*?>([^<]*)/);
    const [, roll24Knowledge] = match(row, /field_roll_lvl24_knowledge.*?>([^<]*)/);

    return {
        id,
        attack,
        defense,
        spellPower,
        knowledge,
        luck,
        morale,
        roll1Attack,
        roll1Defense,
        roll1Power,
        roll1Knowledge,
        roll24Attack,
        roll24Defense,
        roll24Power,
        roll24Knowledge,
    };
}

/**
 *
 */
function checkValid(target) {
    if (!target) {
        return false;
    }
    for (const key in target) {
        if (!target[key]) {
            console.warn(`Invalid value for key "${key}"!`);
            return false;
        }
    }
    return true;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getHeroClasses;
