import createHorse from '../helpers/createHorse.js';
import log, {setLoggingFunction} from '../utils/log.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function parseCore(ApiReference, parsePathOrFunction) {
    setLoggingFunction(ApiReference.log); // all `log()` calls now point to the parent

    log('Beginning to parse...');
    const time = Date.now();
    const horse = await createHorse(parsePathOrFunction, ApiReference);
    const result = await horse.run();
    log(`Finished parsing in ${Date.now() - time} ms.`);

    return result;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default parseCore;
