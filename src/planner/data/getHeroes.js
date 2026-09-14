import match from '../utils/match.js';
import downloadPage from '../helpers/downloadPage.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function getHeroes(lang) {
    const overview = await downloadPage('Heroes_Overview', lang);
    const [table = ''] = match(overview, /<table[\s\S]*?<\/table>/);
    const rows = table.split('</tr>');
    rows.shift(); // remove the header

    const heroes = {};
    for (let i = 0; i < rows.length; i++) {
        const hero = parseRow(rows[i], rows[i + 1]);
        if (hero) {
            heroes[hero.id] = hero;
        }
    }
    return heroes;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseRow(row, extraRow) {
    const [iconColumn, nameColumn, typeColumn, classColumn, specIconColumn, specInfoColumn, skillsColumn] =
        row.split('</td>');

    // id
    let [, id] = match(iconColumn, /data-id=['"]([^'"]*)/);
    if (!id) {
        return;
    }
    id = id.replaceAll('&#95;', '_');

    // icon
    const [, icon] = match(iconColumn, /src=['"]([^'"]*)/);
    if (!icon) {
        return console.warn('No icon!');
    }

    // portrait
    const portrait = icon.replace(/\d*px/, '600px'); // debatable, that image may not exist

    // name
    let [, name] = match(nameColumn, /<a.*?>([^<]*)/);
    if (!name) {
        return console.warn('No name!');
    }
    // console.log('name:', name);

    // isMight
    const isMight = typeColumn.includes('Might');

    // classIcon
    const [, classIcon] = match(classColumn, /src=['"]([^'"]*)/);
    if (!classIcon) {
        return console.warn('No classIcon!');
    }

    // className
    const [, className] = match(classColumn, /<a.*?>([^<]+)/);
    if (!className) {
        return console.warn('No className!');
    }

    // specIcon
    let [, specIcon] = match(specIconColumn, /src=['"]([^'"]*)/);
    if (!specIcon) {
        return console.warn('No specIcon!');
    }
    specIcon = specIcon.replace(/\d*px/, '128px'); // debatable, that image may not exist

    // specName
    const [, specName] = match(specInfoColumn, /<b>([^<]+)/);
    if (!specName) {
        return console.warn('No specName!');
    }

    // specDescription
    const [, description] = match(extraRow || '', /<td.*?>([^<]+)/);
    if (!description) {
        return console.warn('No description!');
    }

    // skills
    const skills = parseSkills(skillsColumn);
    if (!skills) {
        return;
    }

    return {id, icon, portrait, name, isMight, classIcon, className, specIcon, specName, description, skills};
}

/**
 *
 */
function parseSkills(column) {
    const divs = column.split('</div>');
    const skills = [];
    for (const div of divs) {
        if (!div) {
            continue;
        }
        const [, src] = match(div, /src=['"]([^'"]*)/);
        if (!src) {
            return console.warn('No skill src!');
        }
        let [, name] = match(src, /\d+px-(.*?)\.\w+$/);
        name = name.toLowerCase();
        let [, level = 1] = match(name, /_(\d+)$/);
        if (level !== 1) {
            name = name.replace(/_\d+$/, '');
            level = Number(level);
        }
        if (name.includes('faction')) {
            skills.unshift({name, level});
        } else {
            skills.push({name, level});
        }
    }
    return skills;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getHeroes;
