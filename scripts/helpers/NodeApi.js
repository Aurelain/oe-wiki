import findFiles from '../helpers/findFiles.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

const lines = [];
const GAME_DIR = '/home/aurelain/.steam/debian-installation/steamapps/common/Heroes of Might and Magic Olden Era';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function find(...args) {
    const [pattern, exclude, onlyFirstResult] = args;
    const result = await findFiles(GAME_DIR, pattern, exclude, onlyFirstResult);
    return result;
}

/**
 *
 */
function log(...args) {
    console.log(...args);

    // Recording:
    const parts = [];
    for (const arg of args) {
        parts.push(typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg);
    }
    lines.push(parts.join('\n'));
}

/**
 *
 */
function dump() {
    return lines.join('\n');
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
const NodeApi = {
    find,
    log,
    dump,
};
export default NodeApi;
