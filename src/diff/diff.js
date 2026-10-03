import compareArchives from './compareArchives.js';
import BrowserApi from '../helpers/BrowserApi.js';
import parse from '../parse/parse.js';
import addLogLine, {setLogHost} from '../helpers/addLogLine.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
// const PARSE = 'http://localhost:8000/parse/parse.js';
const PARSE = parse;

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
    const root = document.querySelector('#setup');
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
function onInputAChange(event) {
    const file = event.target.files[0];
    if (file) {
        archiveA = file;
        addLogLine('Archive A has been set.');
        checkCompare();
    }
}

/**
 *
 */
function onInputBChange(event) {
    const file = event.target.files[0];
    if (file) {
        archiveB = file;
        addLogLine('Archive B has been set.');
        checkCompare();
    }
}

/**
 *
 */
function checkCompare() {
    if (archiveA && archiveB) {
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
    const output = await compareArchives(archiveA, archiveB, BrowserApi, PARSE);
    outputElement.value = output;
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
diff();
