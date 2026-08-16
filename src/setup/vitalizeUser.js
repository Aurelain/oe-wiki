import {
    BTN_GAME,
    BTN_PREVIEW,
    BTN_RETRIEVE,
    BTN_SAVE,
    DIFF_LIST,
    GAME_DIR_HANDLE,
    IS_DISABLED,
    STATUS_OK,
    STATUS_PROGRESS,
    STATUS_WARNING,
} from './SETTINGS.js';
import checkPermission from './helpers/checkPermission.js';
import {readFromDb, writeToDb} from './utils/LocalDb.js';
import select from './helpers/select.js';
import on from './utils/on.js';
import CSS_DIFF from './css/CSS_DIFF.js';
import buildDiff from './helpers/buildDiff.js';
import retrievePages from './helpers/retrievePages.js';
import setButtonStatus from './helpers/setButtonStatus.js';
import savePages from './helpers/savePages.js';
import {applySettings} from './helpers/ask.js';
import getWikiUrl from './helpers/getWikiUrl.js';
import to from './utils/to.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let rootElement;
let parsingFunction;

let btnGame;
let btnRetrieve;
let btnPreview;
let btnSave;

let dirHandle;

const state = {
    parserResult: null,
    mirrorResult: null,
    progressingButton: null,
    hasDirAccess: false,
    hasPreviewed: false,
    hasSaved: false,
};

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
async function vitalizeUser(root, runParse) {
    rootElement = root;
    parsingFunction = runParse;

    btnGame = select(BTN_GAME);
    btnRetrieve = select(BTN_RETRIEVE);
    btnPreview = select(BTN_PREVIEW);
    btnSave = select(BTN_SAVE);

    on('click', btnGame, onGameClick);
    on('click', btnRetrieve, onRetrieveClick);
    on('click', btnPreview, onPreviewClick);
    on('click', btnSave, onSaveClick);

    dirHandle = await readFromDb(GAME_DIR_HANDLE);
    setState({
        hasDirAccess: await checkPermission(dirHandle),
    });

    applySettings({
        API_URL: getWikiUrl(),
    });
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
    const {hasDirAccess, progressingButton, mirrorResult, hasPreviewed, hasSaved} = state;

    rootElement.classList.toggle(IS_DISABLED, !!progressingButton);

    // 1. Game dir
    setButtonStatus(btnGame, hasDirAccess ? STATUS_OK : STATUS_WARNING);

    // 2. Retrieve
    let retrieveStatus;
    if (progressingButton === BTN_RETRIEVE) {
        retrieveStatus = STATUS_PROGRESS;
    } else {
        retrieveStatus = mirrorResult ? STATUS_OK : null;
    }
    setButtonStatus(btnRetrieve, retrieveStatus);
    btnRetrieve.disabled = !hasDirAccess; // || mirrorResult;

    // 3. Preview
    let previewStatus;
    if (progressingButton === BTN_PREVIEW) {
        previewStatus = STATUS_PROGRESS;
    } else {
        previewStatus = hasPreviewed ? STATUS_OK : null;
    }
    setButtonStatus(btnPreview, previewStatus);
    btnPreview.disabled = !hasDirAccess;

    // 4. Save
    let saveStatus;
    if (progressingButton === BTN_SAVE) {
        saveStatus = STATUS_PROGRESS;
    } else {
        saveStatus = hasSaved ? STATUS_OK : null;
    }
    setButtonStatus(btnSave, saveStatus);
    btnSave.disabled = !hasDirAccess;
}

/**
 *
 */
async function onGameClick() {
    const {hasDirAccess} = state;
    let needsPicker = false;
    if (!dirHandle) {
        needsPicker = true;
    } else {
        if (hasDirAccess) {
            needsPicker = true;
        } else {
            await dirHandle.requestPermission();
        }
    }

    if (needsPicker) {
        const [freshDirHandle] = await to(window.showDirectoryPicker, {mode: 'read'});
        dirHandle = freshDirHandle;
        await writeToDb(GAME_DIR_HANDLE, dirHandle);
    }
    setState({
        parserResult: null,
        mirrorResult: null,
        progressingButton: null,
        hasDirAccess: await checkPermission(dirHandle),
        hasPreviewed: false,
        hasSaved: false,
    });
}

/**
 *
 */
async function onRetrieveClick() {
    await ensureParserResult(BTN_RETRIEVE);
    setState({
        mirrorResult: await retrievePages(state.parserResult),
    });
}

/**
 *
 */
async function onPreviewClick() {
    await ensureParserResult(BTN_PREVIEW);

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
            <title>Preview</title>
            <style>${CSS_DIFF}</style>
        </head>
        <body>
            <div class='${DIFF_LIST}'></div>
        </body>
        </html>
    `);
    doc.close();

    const {mirrorResult, parserResult} = state;
    buildDiff(mirrorResult || {}, parserResult, doc.querySelector('.' + DIFF_LIST));
    setState({
        hasPreviewed: true,
    });
}

/**
 *
 */
async function onSaveClick() {
    await ensureParserResult(BTN_SAVE);
    const hasSaved = await savePages(state.parserResult, state.mirrorResult);
    setState({
        hasSaved,
    });
}

/**
 *
 */
async function ensureParserResult(buttonKey) {
    if (!state.parserResult) {
        setState({
            isWorking: true,
            progressingButton: buttonKey,
        });

        const parserResult = await parsingFunction();
        // parserResult['Data/Difficulty/Impossible.wiki'] = 'foo';

        setState({
            parserResult,
            isWorking: true,
            progressingButton: null,
        });
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default vitalizeUser;
