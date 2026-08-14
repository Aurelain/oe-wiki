// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function sendAndReceive(worker, payload) {
    return new Promise((resolve) => {
        const listener = (event) => {
            const data = event.data && typeof event.data === 'object' ? event.data : {};
            if (data.type === payload.type) {
                worker.removeEventListener('message', listener);
                resolve(data);
            }
        };
        worker.addEventListener('message', listener);
        worker.postMessage(payload);
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default sendAndReceive;
