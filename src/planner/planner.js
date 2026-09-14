import mount from './helpers/mount.jsx';
import App from './components/App.jsx';
import getHeroes from './data/getHeroes.js';
import getSkills from './data/getSkills.js';

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
    mount(App, root, {
        bgUrl: root.querySelector('.background img').src,
        levelUrl: root.querySelector('.level img').src,
        emptyUrl: root.querySelector('.empty img').src,
        heroes: await getHeroes(lang),
        skills: await getSkills(lang),
    });
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
planner();
