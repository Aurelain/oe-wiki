import mount from './helpers/mount.jsx';
import App from './components/App.jsx';
import getHeroes from './data/getHeroes.js';
import getSkills from './data/getSkills.js';
import getHeroClasses from './data/getHeroClasses.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const IMAGES = [
    'background',
    'level',
    'empty',
    'filter_all',
    'filter_armor',
    'filter_back',
    'filter_belt',
    'filter_boots',
    'filter_head',
    'filter_item_slot',
    'filter_left_hand',
    'filter_byLevel_desc',
    'filter_byLevel_asc',
    'filter_byName',
    'filter_right_hand',
    'filter_ring',
    'filter_unique_slot',
    'rarity_common',
    'rarity_rare',
    'rarity_epic',
    'rarity_legendary',
    'inventory',
];

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function planner() {
    const root = document.querySelector('.planner');
    if (!root) {
        window.addEventListener('load', onWindowLoad);
    } else {
        await run(root);
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function onWindowLoad() {
    window.removeEventListener('load', onWindowLoad);
    const root = document.querySelector('.planner');
    if (root) {
        await run(root);
    }
}

/**
 *
 */
async function run(root) {
    console.log('Mounting HeroPlanner.');
    const {lang} = root.dataset;
    const images = parseImages(root);
    injectLoader(root);

    const now = Date.now();
    mount(App, root, {
        images,
        heroes: await getHeroes(lang),
        skills: await getSkills(lang),
        heroClasses: await getHeroClasses(),
    });
    console.log(`Mounted successfully (${Date.now() - now} ms).`);
}

/**
 *
 */
function injectLoader(root) {
    root.innerHTML = `
        <style>
            @keyframes animationSpinner {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        </style>
        <div id='spinner' style='
            position: absolute;
            left: 50%;
            top: 100px;
            margin: -12px 0 0 -12px;
            width: 24px;
            height: 24px;
            animation: animationSpinner infinite linear .75s;
            border-radius: 100%;
            border: 2px solid dodgerblue;
            border-top-color: transparent;
            box-sizing: border-box;
        '></div>
    `;
    root.style.position = 'relative';
    root.style.visibility = 'visible';
}

/**
 *
 */
function parseImages(root) {
    const output = {};
    for (const className of IMAGES) {
        output[className] = root.querySelector(`.${className} img`).src;
    }
    return output;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
planner();
