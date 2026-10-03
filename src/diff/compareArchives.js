import createHorse from '../helpers/createHorse.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let currentBuffer;
let ParentApi;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function compareArchives(bufferA, bufferB, ApiReference, parsePathOrFunction) {
    ParentApi = ApiReference;
    const horse = await createHorse(parsePathOrFunction, InternalApi);

    currentBuffer = bufferA;
    const resultA = await horse.run();
    console.log('resultA:', Object.keys(resultA));

    currentBuffer = bufferB;
    const resultB = await horse.run();
    console.log('resultB:', Object.keys(resultB));

    return 'hello';
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
const InternalApi = {
    find: () => {
        return currentBuffer; // instead of getting any actual file, we're always returning the current Core.zip
    },
    log: (...args) => {
        console.log('InternalApi:');
        ParentApi.log(...args); // redirect
    },
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareArchives;
