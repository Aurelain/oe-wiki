import createHorse from '../helpers/createHorse.js';
import compareRepo from './compareRepo.js';
import log, {setLoggingFunction} from '../parse/utils/log.js';
import createRepo from './createRepo.js';

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
    const time = Date.now();
    ApiReference.log('Beginning comparison...');

    ParentApi = ApiReference;
    setLoggingFunction(ParentApi.log); // all `log()` calls now point to the parent
    const horse = await createHorse(parsePathOrFunction, InternalApi);

    // First:
    currentBuffer = bufferA;
    const timeA = Date.now();
    log('Parsing the first archive...');
    const parsedA = await horse.run();
    log(`Finished parsing the first archive in ${Date.now() - timeA} ms.`);

    // Second:
    currentBuffer = bufferB;
    const timeB = Date.now();
    log('Parsing the second archive...');
    const parsedB = await horse.run();
    log(`Finished parsing the second archive in ${Date.now() - timeB} ms.`);

    // Comparison:
    log('Staring comparison...');
    const timeC = Date.now();
    const repoA = createRepo(parsedA);
    const repoB = createRepo(parsedB);
    const output = compareRepo(repoA, repoB);
    log(`Finished comparison in ${Date.now() - timeC} ms.`);

    // Output:
    log(`Finished all processes in ${Date.now() - time} ms.`);
    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
const InternalApi = {
    find: () => {
        return currentBuffer; // instead of getting any actual file, we're always returning the current Core.zip
    },
    log: (...args) => {
        ParentApi.log(...args); // redirect
    },
};

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default compareArchives;
