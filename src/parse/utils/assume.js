/**
 *
 */
const assume = (condition, ...args) => {
    if (!condition) {
        const lines = [];
        for (const arg of args) {
            lines.push(typeof arg === 'object' ? JSON.stringify(arg, null, 4) : arg);
        }
        const error = new Error(lines.join('\n'));
        error.extra = args;
        throw error;
    }
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default assume;
