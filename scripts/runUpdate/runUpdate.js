import fs from 'node:fs';
import NodeApi from '../helpers/NodeApi.js';
import parse from '../../src/parse/parse.js';
import parseCore from '../../src/update/parseCore.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const WIKI_MIRROR_DIR = '/a/aims/oe-local/wiki';

// const PARSE = '/a/aims/oe-wiki/src/parse/parse.js';
const PARSE = parse;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function runUpdate() {
    // Run parse:
    const result = await parseCore(NodeApi, PARSE);

    // Write to local drive:
    for (const key in result) {
        const path = WIKI_MIRROR_DIR + '/' + key;
        const content = result[key];
        fs.writeFileSync(path, content);
    }

    // Persist log:
    NodeApi.log('\nResult:\n' + Object.keys(result).join('\n'));
    fs.writeFileSync('output.txt', NodeApi.dump());

    // Finish:
    console.log('Done.');
    process.exit(0);
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
runUpdate();
