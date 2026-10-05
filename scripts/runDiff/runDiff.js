import fs from 'node:fs';
import compareArchives from '../../src/diff/compareArchives.js';
import NodeApi from '../helpers/NodeApi.js';
import parse from '../../src/parse/parse.js';
import {toggleRecording} from '../../src/utils/log.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const PATCH_INFO = {
    id: '0.80.34',
    date: '2026-07-10',
};
const ARCHIVE_A = '/a/aims/obelisk/Core_2026-07-06_v0.80.33.zip';
const ARCHIVE_B = '/a/aims/obelisk/Core_2026-07-10_v0.80.34.zip';

// const PARSE = '/a/aims/oe-wiki/src/parse/parse.js';
const PARSE = parse;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function runDiff() {
    const archiveA = getArrayBuffer(ARCHIVE_A);
    const archiveB = getArrayBuffer(ARCHIVE_B);

    toggleRecording(true);
    const result = await compareArchives(archiveA, archiveB, NodeApi, PARSE, PATCH_INFO);
    const logged = toggleRecording(false);

    fs.writeFileSync(
        'output.txt',
        `Logged:
${logged}

Result:
${result}`,
    );
    console.log('Done.');
    process.exit(0);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function getArrayBuffer(path) {
    const file = fs.readFileSync(path);
    return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
runDiff();
