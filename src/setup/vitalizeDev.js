import on from './utils/on.js';
import {
    BTN_GAME,
    BTN_MIRROR,
    DIFF_LIST,
    GAME_DIR_HANDLE,
    MIRROR_DIR_HANDLE,
    STATUS_OK,
    STATUS_WARNING,
} from './SETTINGS.js';
import select from './helpers/select.js';
import {readFromDb} from './utils/LocalDb.js';
import refreshDirHandle from './helpers/refreshDirHandle.js';
import checkPermission from './helpers/checkPermission.js';
import getFile from './utils/getFile.js';
import buildDiff from './helpers/buildDiff.js';
import setButtonStatus from './helpers/setButtonStatus.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let parsingFunction;

let btnGame;
let btnMirror;

const state = {
    hasGameAccess: false,
    hasMirrorAccess: false,
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function vitalizeDev(root, runParse) {
    parsingFunction = runParse;

    btnGame = select(BTN_GAME);
    btnMirror = select(BTN_MIRROR);

    on('click', btnGame, onGameClick);
    on('click', btnMirror, onMirrorClick);

    await refreshDiff();
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 * Mimics the React setState pattern.
 */
function setState(changes) {
    Object.assign(state, changes);
    render();
}

/**
 * Mimics React.
 */
function render() {
    const {hasGameAccess, hasMirrorAccess} = state;
    setButtonStatus(btnGame, hasGameAccess ? STATUS_OK : STATUS_WARNING);
    setButtonStatus(btnMirror, hasMirrorAccess ? STATUS_OK : STATUS_WARNING);
}

/**
 *
 */
async function onGameClick() {
    const dirHandle = await readFromDb(GAME_DIR_HANDLE);
    const freshHandle = await refreshDirHandle(GAME_DIR_HANDLE);
    if (!(await dirHandle.isSameEntry(freshHandle))) {
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
        await refreshDiff();
    }
}

/**
 *
 */
async function refreshDiff() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    const mirrorDirHandle = await readFromDb(MIRROR_DIR_HANDLE);

    setState({
        hasGameAccess: checkPermission(gameDirHandle),
        hasMirrorAccess: checkPermission(mirrorDirHandle),
    });
    if (!state.hasGameAccess) {
        return;
    }

    const parserResult = await parsingFunction();
    const mirrorResult = await runDevMirror(parserResult);
    buildDiff(mirrorResult, parserResult, select(DIFF_LIST));
}

/**
 *
 */
async function runDevMirror(parserResult) {
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
