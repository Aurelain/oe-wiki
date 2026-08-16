import assume from '../utils/assume.js';
import to from '../utils/to.js';
import log from './log.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function compile(text) {
    text = text.replace(/\/\/.*/g, '');
    text = text.replace(/\/\*[\s\S]*?\*\//g, '');
    const output = {};
    const functions = text.split('}');
    functions.pop();
    if (!functions.length) {
        log('No function!');
        return {};
    }
    for (const functionText of functions) {
        const [compiled, error] = to(compileFunction, functionText);
        if (error) {
            const extra = error.extra || [];
            log('Failed to compile!', error.message, ...extra);
        } else {
            Object.assign(output, compiled);
        }
    }
    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function compileFunction(functionText) {
    const parts = functionText.split('{');
    assume(parts.length === 2, 'Function must have 2 parts!', functionText);
    const header = parts[0].trim();
    const headerParts = header.split(' ');
    assume(headerParts.length === 2, 'Header must have 2 parts!', functionText);
    const name = headerParts[1];
    assume(checkIdentifier(name), 'Invalid function name!', functionText);
    return {
        [name]: {
            type: headerParts[0],
            body: compileBody(parts[1], name),
        },
    };
}

/**
 *
 */
function compileBody(text, functionName) {
    const output = [];
    const lines = text.split(')');
    lines.pop();
    assume(lines.length > 0, 'No lines!', functionName);
    for (const line of lines) {
        output.push(compileLine(line, functionName));
    }
    return output;
}

/**
 *
 */
function compileLine(line, functionName) {
    const parts = line.split('(');
    assume(parts.length === 2, 'Invalid line!', functionName, line);
    const action = parts[0].trim();
    assume(checkIdentifier(action), 'Invalid action!', functionName, line);
    const parameters = parts[1].split(',');
    const variable = parameters.shift().trim();
    assume(checkIdentifier(variable), 'Invalid variable!', functionName, line);
    return {
        variable,
        action,
        params: compileParams(parameters, functionName, line),
    };
}

/**
 *
 */
function compileParams(parameters, functionName, line) {
    const output = [];
    for (const param of parameters) {
        let value = param.trim();
        if (value.startsWith('"')) {
            assume(value.endsWith('"'), 'Unexpected quotes!', functionName, line);
            value = value.substring(1, value.length - 1);
        } else if (value.match(/^\d+$/)) {
            value = Number(value);
        } else {
            assume(checkIdentifier(value), 'Invalid variable!', functionName, line);
            value = '#' + value;
        }
        output.push(value);
    }
    return output;
}

/**
 *
 */
function checkIdentifier(text) {
    return !!text.match(/^[A-Za-z][A-Za-z0-9_]*$/);
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================

export default compile;
