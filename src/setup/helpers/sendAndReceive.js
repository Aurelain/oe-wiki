// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function sendAndReceive(worker, type, payload) {
    return new Promise((resolve) => {
        const listener = (event) => {
            const data = event.data && typeof event.data === 'object' ? event.data : {};
            if (data.type === type) {
                console.log(`Parent received a "${type}" reply.`);
                worker.removeEventListener('message', listener);
                resolve(data.payload);
            }
        };
        worker.addEventListener('message', listener);
        worker.postMessage({type, payload});
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default sendAndReceive;
