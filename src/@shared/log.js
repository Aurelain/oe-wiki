// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let loggingFunction = console.log;
let isRecording = false;
const lines = [];

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function log(...args) {
    if (isRecording) {
        const parts = [];
        for (const arg of args) {
            parts.push(typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg);
        }
        lines.push(parts.join('\n'));
    }
    loggingFunction(...args);
}

/**
 *
 */
function setLoggingFunction(fn) {
    loggingFunction = fn;
}

/**
 *
 */
function toggleRecording(shouldRecord) {
    if (isRecording) {
        if (!shouldRecord) {
            isRecording = false;
            return lines.join('\n'); // dump
        }
    } else {
        if (shouldRecord) {
            isRecording = true;
            lines.length = 0;
        }
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export {setLoggingFunction, toggleRecording};
export default log;
