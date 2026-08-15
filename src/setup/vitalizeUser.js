import {
    BTN_GAME,
    BTN_PREVIEW,
    BTN_RETRIEVE,
    BTN_SAVE,
    DIFF_LIST,
    GAME_DIR_HANDLE,
    HAS_PROGRESS,
    IS_GRANTED,
} from './SETTINGS.js';
import checkPermission from './helpers/checkPermission.js';
import {readFromDb} from './utils/LocalDb.js';
import select from './helpers/select.js';
import on from './utils/on.js';
import refreshDirHandle from './helpers/refreshDirHandle.js';
import CSS_DIFF from './css/CSS_DIFF.js';
import buildDiff from './helpers/buildDiff.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let parsingFunction;
let parserResult = null;
let mirrorResult = null;
let isWorking = false;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
async function vitalizeUser(runParse) {
    parsingFunction = runParse;
    on('click', BTN_GAME, onGameClick);
    on('click', BTN_RETRIEVE, onRetrieveClick);
    on('click', BTN_PREVIEW, onPreviewClick);
    on('click', BTN_SAVE, onSaveClick);
    await updateButtons();
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function onGameClick() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    await refreshDirHandle(GAME_DIR_HANDLE);
    const freshDirHandle = await readFromDb(GAME_DIR_HANDLE);
    if (!(await gameDirHandle.isSameEntry(freshDirHandle))) {
        parserResult = null;
        mirrorResult = null;
    }
    await updateButtons();
}

/**
 *
 */
async function onRetrieveClick(event) {
    await ensureParserResult(event);
}

/**
 *
 */
async function onPreviewClick(event) {
    await ensureParserResult(event);

    const popup = window.open('', 'Preview');
    if (!popup) {
        return;
    }
    const doc = popup.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Diff</title>
            <style>${CSS_DIFF}</style>
        </head>
        <body>
            <div class='${DIFF_LIST}'></div>
        </body>
        </html>
    `);
    doc.close();

    buildDiff({}, parserResult, doc.querySelector('.' + DIFF_LIST));
}

/**
 *
 */
async function onSaveClick(event) {
    await ensureParserResult(event);
}

/**
 *
 */
async function updateButtons() {
    const gameDirHandle = await readFromDb(GAME_DIR_HANDLE);
    const isGameGranted = await checkPermission(gameDirHandle);
    select(BTN_GAME).classList.toggle(IS_GRANTED, isGameGranted);
    select(BTN_GAME).disabled = isWorking;
    select(BTN_RETRIEVE).disabled = isWorking || !isGameGranted || !!mirrorResult;
    select(BTN_PREVIEW).disabled = isWorking || !isGameGranted;
    select(BTN_SAVE).disabled = isWorking || !isGameGranted;
}

/**
 *
 */
async function ensureParserResult({currentTarget}) {
    if (!parserResult) {
        isWorking = true;
        await updateButtons();

        currentTarget.classList.add(HAS_PROGRESS);
        parserResult = await parsingFunction();
        currentTarget.classList.remove(HAS_PROGRESS);

        isWorking = false;
        await updateButtons();
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default vitalizeUser;
