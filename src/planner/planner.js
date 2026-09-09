import HTML from './HTML.js';
import match from './utils/match.js';
import {HEIGHT, WIDTH} from './SETTINGS.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const wikiUrl = getWikiUrl();
const vars = {
    rootElement: null,
    contentElement: null,
    portraitElement: null,
};
const state = {
    hero: 'human_hero_4',
};

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

    const bgUrl = root.querySelector('.background img').src;
    const level = root.querySelector('.level img').src;
    let html = HTML;
    html = html.replace('@bgUrl', bgUrl);
    html = html.replace('@level', level);
    root.innerHTML = html;

    // Vars:
    vars.rootElement = root;
    vars.contentElement = root.querySelector('.content');
    vars.portraitElement = root.querySelector('.portrait');
    vars.heroes = await getHeroes();

    render();

    // Scale:
    window.addEventListener('resize', onWindowResize);
    refreshScale();
    root.style.visibility = 'visible';
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
            console.log('No id!');
            continue;
        }
        id = id.replaceAll('&#95;', '_');
        const [, icon] = match(row, /src=['"]([^'"]*)/);
        if (!icon) {
            console.log('No icon!');
            continue;
        }
        let [, portrait] = match(row, /srcset=['"].*?([^ ]*) 2x/);
        if (!portrait) {
            console.log('No portrait!');
            continue;
        }
        portrait = portrait.replaceAll('140px', '600px');
        heroes[id] = {icon, portrait};
    }
    console.log('heroes:', heroes);
    return heroes;
}

/**
 *
 */
function render() {
    const {portraitElement, heroes} = vars;
    const {hero} = state;
    portraitElement.src = heroes[hero].portrait;
}

/**
 *
 */
function onWindowResize() {
    refreshScale();
}

/**
 *
 */
function refreshScale() {
    const {rootElement, contentElement} = vars;
    const {width} = rootElement.getBoundingClientRect();

    const coreWidth = Math.min(width, WIDTH);
    const coreHeight = (coreWidth * HEIGHT) / WIDTH;
    rootElement.style.height = Math.ceil(coreHeight) + 'px';

    const scaleRatio = coreWidth / WIDTH;
    contentElement.style.transform = `scale(${scaleRatio})`;
    contentElement.style.left = Math.floor((width - coreWidth) / 2) + 'px';
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
planner();
