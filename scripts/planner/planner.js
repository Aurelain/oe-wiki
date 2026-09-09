import build from '../build/build.js';
import path from 'node:path';
import {execSync} from 'child_process';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const OUTPUT_DIR = path.resolve(path.join(import.meta.dirname, '..', '..', 'dev')); // not docs!

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
async function planner() {
    try {
        await build('src/planner/planner.js', '-o', OUTPUT_DIR, '--dev');
    } catch (e) {
        console.error('Build failed!');
        return;
    }
    await refreshBrowser();
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================

/**
 *
 */
async function refreshBrowser() {
    let browserId = findBrowser();
    if (!browserId) {
        console.log('Could not find browser!');
        return;
    }
    try {
        const editorId = execSync(`xdotool getwindowfocus`).toString().match(/\w+/)[0];
        execSync(`xdotool windowactivate ${browserId}`);
        await sleep(100);
        execSync(`xdotool key ctrl+r`);
        await sleep(100);
        execSync(`xdotool windowactivate ${editorId}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

/**
 *
 */
function findBrowser() {
    try {
        return execSync(`xdotool search --name " Chromium$"`).toString().match(/\w+/)[0];
    } catch (error) {
        // console.error('Error:', error.message);
    }
}

/**
 *
 */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
planner();
