import API from '../API.js';
import {unzipSync} from 'fflate';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================

/**
 *
 */
async function unzipCore() {
    const file = await API.find('HeroesOldenEra_Data/StreamingAssets/Core.zip', null, true);
    if (!file) {
        API.log('!Invalid zip!');
        return {};
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    return unzipSync(buffer);
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default unzipCore;
