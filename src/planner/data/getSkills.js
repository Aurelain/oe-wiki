import match from '../utils/match.js';
import downloadPage from '../helpers/downloadPage.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getSkills(lang) {
    const overview = await downloadPage('Skills_Overview', lang);
    const boxes = overview.split('<div class="box ');
    boxes.shift(); // remove the preamble

    const skills = {};
    for (let i = 0; i < boxes.length; i++) {
        const skill = parseBox(boxes[i], boxes[i + 1], boxes[i + 2], boxes[i + 3]);

        if (checkValid(skill)) {
            skills[skill.id] = skill;
        }
    }

    return skills;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseBox(box, subA, subB, subC) {
    // console.log('box:', box);
    if (!box.startsWith('rank')) {
        return;
    }

    // Id
    let [, id] = match(box, /data-id=['"]([^'"]*)/);
    id = id.replaceAll('&#95;', '_');

    // Other fields
    const [, icon] = match(box, /([^ ]*) 2x/);
    const [, name] = match(box, /box-name.*?>.*?>([^<]*)/);
    const [, description] = match(box, /box-description.*?>([\s\S]*?)<\/div>/);

    const subs = [];
    if (subA.startsWith('sub')) {
        for (const markup of [subA, subB, subC]) {
            const parsed = parseSub(markup);
            if (checkValid(parsed)) {
                subs.push(parsed);
            }
        }
    }

    return {id, icon, name, description, subs};
}

/**
 *
 */
function parseSub(subMarkup) {
    if (!subMarkup.startsWith('sub')) {
        return;
    }

    // Id
    let [, id] = match(subMarkup, /data-id=['"]([^'"]*)/);
    id = id.replaceAll('&#95;', '_');

    // Other fields
    const [, icon] = match(subMarkup, /([^ ]*) 2x/);
    const [, name] = match(subMarkup, /box-name.*?>.*?>([^<]*)/);
    const [, description] = match(subMarkup, /box-description.*?>([\s\S]*?)<\/div>/);

    return {id, icon, name, description};
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
export default getSkills;
