import mount from './helpers/mount.jsx';
import App from './components/App.jsx';
import getHeroes from './data/getHeroes.js';

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
//  R U N
// =====================================================================================================================
planner();
