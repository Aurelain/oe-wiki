import compareArchives from './compareArchives.js';
import BrowserApi from '../helpers/BrowserApi.js';
// import parse from '../parse/parse.js';
import addLogLine, {setLogHost} from '../helpers/addLogLine.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const PARSE = 'http://localhost:8000/parse/parse.js';
// const PARSE = parse;

let patchId;
let patchDate;
let archiveA;
let archiveB;
let buttonElement;
let outputElement;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function diff() {
    const root = document.querySelector('.diff-root');
    if (!root) {
        if (document.readyState !== 'complete') {
            window.addEventListener('load', onWindowLoad);
        } else {
            console.warn('Cannot find root!');
        }
    } else {
        run(root);
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
    await diff();
}

/**
 *
 */
function run(root) {
    root.innerHTML = `
        Patch version: <input class='patchId' /><br>
        Patch date: <input class='patchDate'/><br>
        <br>
        Archive A: <input class='inputA' type='file'/><br>
        Archive B: <input class='inputB' type='file'/><br>
        <br>
        <button class='btnCompare' disabled>Compare</button><br>
        <br>
        Output:<br>
        <textarea class='output' style='height:200px;'></textarea>
        <br>
        Log:<br>
        <div class='toolLog'></div>
    `;
    root.querySelector('.patchId').addEventListener('change', onPatchIdChange);
    root.querySelector('.patchDate').addEventListener('change', onPatchDateChange);
    root.querySelector('.inputA').addEventListener('change', onInputAChange);
    root.querySelector('.inputB').addEventListener('change', onInputBChange);

    buttonElement = root.querySelector('.btnCompare');
    buttonElement.addEventListener('click', onBtnCompareClick);

    outputElement = root.querySelector('.output');

    setLogHost(root.querySelector('.toolLog'));
    addLogLine('Initialized.');
}

/**
 *
 */
function onPatchIdChange(event) {
    patchId = event.target.value;
    checkCompare();
}

/**
 *
 */
function onPatchDateChange(event) {
    patchDate = event.target.value;
    checkCompare();
}

/**
 *
 */
function onInputAChange(event) {
    archiveA = event.target.files[0];
    checkCompare();
}

/**
 *
 */
function onInputBChange(event) {
    archiveB = event.target.files[0];
    checkCompare();
}

/**
 *
 */
function checkCompare() {
    if (patchId && patchDate && archiveA && archiveB) {
        buttonElement.disabled = false;
        addLogLine('You may now click "Compare" to obtain the output...');
    } else {
        buttonElement.disabled = true;
    }
}

/**
 *
 */
async function onBtnCompareClick() {
    const patchInfo = {id: patchId, date: patchDate};
    const output = await compareArchives(archiveA, archiveB, BrowserApi, PARSE, patchInfo);
    outputElement.value = output;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
diff();
