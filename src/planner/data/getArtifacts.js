import match from '../utils/match.js';
import downloadPage from '../helpers/downloadPage.js';
import {
    ARMOR,
    BANNER,
    BELT,
    BOOTS,
    CAPE,
    COMMON,
    EPIC,
    HELMET,
    LEGENDARY,
    POUCH,
    RARE,
    RING,
    SHIELD,
    SWORD,
} from '../SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ANCHOR_TO_KEY = {
    Main_Hand: SWORD,
    Off_Hand: SHIELD,
    Armor: ARMOR,
    Head: HELMET,
    Boots: BOOTS,
    Belt: BELT,
    Back: CAPE,
    Rings: RING,
    Item: POUCH,
    Relic: BANNER,
};

const SLOT_TO_KEY = {
    RightHand: SWORD,
    LeftHand: SHIELD,
    Armor: ARMOR,
    Helmet: HELMET,
    Boots: BOOTS,
    Belt: BELT,
    Cloak: CAPE,
    Rings: RING,
    Sundries: POUCH,
    Banner: BANNER,
};

const RARITIES = {
    I: COMMON,
    II: RARE,
    III: EPIC,
    IV: LEGENDARY,
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getArtifacts(lang) {
    const overview = await downloadPage('Artifacts_Overview', lang);
    const rarities = {};
    const list = parseList(overview, rarities);
    return {
        categories: parseCategories(overview),
        list,
        sets: parseSets(overview),
        rarities,
    };
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseCategories(overview) {
    const [nav = ''] = match(overview, /<div class="nav".*?<\/div>/);
    const results = match(nav, /<a href="#([^"]*)">(.*?)</g);
    const output = {};
    for (const result of results) {
        const [, anchor, translation] = result;
        const key = ANCHOR_TO_KEY[anchor];
        if (!key) {
            console.warn('Unknown artifact anchor!');
            continue;
        }
        output[key] = translation;
    }
    return output;
}

/**
 *
 */
function parseList(overview, rarities) {
    const [, giantTableContent = ''] = match(overview, /<table([\s\S]*)<\/table>/);
    const clean = giantTableContent.replace(/<table[\s\S]*?<\/table>/g, ''); // remove the Hint tables
    const rows = clean.split('</tr>');
    const output = {};
    for (const row of rows) {
        const parsed = parseRow(row, rarities);
        if (parsed) {
            // console.log(parsed.id, JSON.stringify(parsed, null, 4));
            output[parsed.id] = parsed;
        }
    }
    return output;
}

/**
 *
 */
function parseRow(row, rarities) {
    let [, id] = match(row, /data-id="([^"]*)"/);
    if (!id) {
        return;
    }
    id = id.replaceAll('&#95;', '_');

    // Extract columns:
    const [iconColumn, nameColumn, descColumn, , , slotColumn, rarityColumn, setColumn] = row.split('</td>');

    // Some columns:
    const [, icon] = match(iconColumn, /([^ ]*) 2x/);
    const [, name] = match(nameColumn, />([^<]+)/);
    const description = descColumn.replace(/<td.*?>/g, '');

    // Slot:
    let [, slot] = match(slotColumn, /([a-zA-Z]+)\.png/);
    if (!SLOT_TO_KEY[slot]) {
        return console.warn('Unknown slot!', id);
    }
    slot = SLOT_TO_KEY[slot];

    // Rarity:
    const [, rarityValue, rarityTranslation] = match(rarityColumn, />([^<]+)<.*?>([^<]+)/);
    if (!RARITIES[rarityValue]) {
        return console.warn('Unknown rarity!', id);
    }
    const rarity = RARITIES[rarityValue];
    rarities[rarity] = rarityTranslation; // mutation!

    // Set:
    const setId = parseSetId(setColumn);

    return {id, icon, name, description, slot, rarity, setId};
}

/**
 *
 */
function parseSetId(setColumn) {
    let [, id = ''] = match(setColumn, /data-sort-value="([^"]*)"/);
    id = id.replaceAll('&#95;', '_');
    if (!id.match(/[a-z]/)) {
        return;
    }
    return id;
}

/**
 *
 */
function parseSets(overview) {
    const tds = match(overview, /data-sort-value="[^"]*?set"[\s\S]*?<\/td>/g);
    const output = {};
    for (const td of tds) {
        const [raw] = td;
        const parsed = parseSet(raw, output);
        if (parsed) {
            output[parsed.id] = parsed;
        }
    }
    return output;
}

/**
 *
 */
function parseSet(rawSet, existing) {
    const id = parseSetId(rawSet);
    if (!id || existing[id]) {
        return;
    }

    const [, name] = match(rawSet, />([^<]+)/);

    const membersFound = match(rawSet, /src="[^"]*-([^"]*?)\.png/g);
    const members = [];
    for (const [, member] of membersFound) {
        members.push(member.toLowerCase());
    }
    const levelsFound = match(rawSet, /set-level.*?>([^<]*)[\s\S]*?set-text.*?>([^<]*)/g);
    const levels = [];
    for (const [, about, text] of levelsFound) {
        levels.push({
            count: Number(match(about, /\d+/)[0]),
            about,
            text,
        });
    }

    return {id, name, members, levels};
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getArtifacts;
