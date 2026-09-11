import match from './utils/match.js';
import mount from './helpers/mount.jsx';
import App from './components/App.jsx';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const wikiUrl = getWikiUrl();

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function planner() {
    const root = document.querySelector('.planner');
    if (!root) {
        return;
    }

    // Mount the App to the DOM
    mount(App, root, {
        bgUrl: root.querySelector('.background img').src,
        levelUrl: root.querySelector('.level img').src,
        heroes: await getHeroes(),
    });
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function getWikiUrl() {
    let {href} = window.location;
    href = href.replace(/\/..$/, ''); // remove normal language suffix (e.g. `/fr`)
    href = href.replace(/\/..-\w+$/, ''); // remove advanced language suffix (e.g. `/zh-hans`)
    href = href.replace(/[^/]*$/, ''); // remove advanced language suffix (e.g. `/zh-hans`)
    return href;
}

/**
 *
 */
async function downloadPage(page) {
    let response;
    try {
        response = await fetch(wikiUrl + page);
    } catch (e) {
        return '';
    }
    return await response.text();
}

/**
 *
 */
async function getHeroes() {
    const overview = await downloadPage('Heroes_Overview');
    const rows = match(overview, /<tr class=['"]hero['"][\s\S]*?<\/tr>/g);
    const heroes = {};
    for (const [row] of rows) {
        let [, id] = match(row, /data-id=['"]([^'"]*)/);
        if (!id) {
            console.warn('No id!');
            continue;
        }
        id = id.replaceAll('&#95;', '_');
        const [, icon] = match(row, /src=['"]([^'"]*)/);
        if (!icon) {
            console.warn('No icon!');
            continue;
        }
        let [, portrait] = match(row, /srcset=['"].*?([^ ]*) 2x/);
        if (!portrait) {
            console.warn('No portrait!');
            continue;
        }
        portrait = portrait.replaceAll('140px', '600px');
        heroes[id] = {id, icon, portrait};
    }
    return heroes;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
planner();
