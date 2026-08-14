import API from './API.js';
import Difficulty from './parsers/Difficulty.js';
import unzipCore from './helpers/unzipCore.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const DEBUG = new Set([
    // -- Use this to focus on only some parsers:
    // Difficulty,
]);

const PARSERS = [
    //
    Difficulty,
];
// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function parse() {
    const zipHub = await unzipCore();
    // buildCache(zipHub);

    const results = {};
    for (const parser of PARSERS) {
        if (!DEBUG.size || DEBUG.has(parser)) {
            Object.assign(results, parser(zipHub));
        }
    }

    const output = {};
    for (const key in results) {
        const path = 'Data/' + key + '.wiki';
        output[path] = prepareContent(results[key]);
    }

    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function prepareContent(parsingResult) {
    const parts = [];
    parts.push(`<!-- Bot-managed page. Edit the source in obelisk-bot, not here. -->`);
    parsingResult.comment && parts.push(parsingResult.comment);
    for (const def of parsingResult) {
        parts.push(convertDefinitionToTemplate(def));
    }
    parts.push(`[[Category:Game Data Import]]`);
    return parts.join('\n\n').trim();
}

/**
 *
 */
function convertDefinitionToTemplate(definition) {
    const lines = [];
    lines.push(`{{${definition._type}`);
    delete definition._type; // mutation
    for (const key in definition) {
        lines.push(`| ${key.trim()} = ${convertValue(definition[key])}`);
    }
    lines.push('}}');
    return lines.join('\n');
}

/**
 *
 */
function convertValue(value) {
    switch (typeof value) {
        case 'boolean':
            return value ? 'yes' : 'no';
        case 'string':
            return value; // value.trim(); // TODO: restore trim
        case 'number':
            return value.toString();
        default:
            if (Array.isArray(value)) {
                return value.join(',');
            } else {
                API.log('Unexpected value type!', typeof value, value);
                return String(value);
            }
    }
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
API.initialize(parse);
export default parse;
