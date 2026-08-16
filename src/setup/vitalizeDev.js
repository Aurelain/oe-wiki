import on from './utils/on.js';
import {BTN_GAME, BTN_MIRROR, DIFF_LIST, GAME_DIR_HANDLE, IS_GRANTED, MIRROR_DIR_HANDLE} from './SETTINGS.js';
import select from './helpers/select.js';
import {readFromDb} from './utils/LocalDb.js';
import refreshDirHandle from './helpers/refreshDirHandle.js';
import checkPermission from './helpers/checkPermission.js';
import getFile from './utils/getFile.js';
import buildDiff from './helpers/buildDiff.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let parsingFunction;
let parserResult = null;
let mirrorResult = null;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function vitalizeDev(root, runParse) {
    parsingFunction = runParse;
    on('click', BTN_GAME, onGameClick);
    on('click', BTN_MIRROR, onMirrorClick);
    await updateButtons();
    await refreshDiff();
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function onGameClick() {
    const dirHandle = await readFromDb(GAME_DIR_HANDLE);
    const freshHandle = await refreshDirHandle(GAME_DIR_HANDLE);
    if (!(await dirHandle.isSameEntry(freshHandle))) {
        await updateButtons();
        await refreshDiff();
    }
}

/**
 *
 */
async function onMirrorClick() {
    const dirHandle = await readFromDb(MIRROR_DIR_HANDLE);
    const freshHandle = await refreshDirHandle(MIRROR_DIR_HANDLE);
    if (!(await dirHandle.isSameEntry(freshHandle))) {
        await updateButtons();
        await refreshDiff();
    }
}

/**
 *
 */
async function updateButtons() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    const isGameGranted = await checkPermission(gameDirHandle);
    select(BTN_GAME).classList.toggle(IS_GRANTED, isGameGranted);

    const mirrorDirHandle = await readFromDb(MIRROR_DIR_HANDLE);
    const isMirrorGranted = await checkPermission(mirrorDirHandle);
    select(BTN_MIRROR).classList.toggle(IS_GRANTED, isMirrorGranted);
}

/**
 *
 */
async function refreshDiff() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    if (!(await checkPermission(gameDirHandle))) {
        return;
    }
    parserResult = await parsingFunction();
    mirrorResult = await runDevMirror();
    buildDiff(mirrorResult, parserResult, select(DIFF_LIST));
}

/**
 *
 */
async function runDevMirror() {
    const output = {};
    const mirrorDirHandle = await readFromDb(MIRROR_DIR_HANDLE);
    if (!(await checkPermission(mirrorDirHandle))) {
        return output;
    }
    for (const path in parserResult) {
        const file = await getFile(mirrorDirHandle, path);
        output[path] = file ? await file.text() : undefined;
    }
    // output['Data/Difficulty~Easy.wiki'] += 'x';
    // output['Data/Difficulty~Normal.wiki'] = undefined;
    // output['Data/Difficulty~Expert.wiki'] = undefined;
    // output['Data/Difficulty~Impossible.wiki'] = undefined;
    return output;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default vitalizeDev;
