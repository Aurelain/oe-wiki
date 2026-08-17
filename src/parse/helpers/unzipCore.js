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
    const buffer = await convertToUint8Array(file);
    return unzipSync(buffer);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function convertToUint8Array(file) {
    if (typeof file.arrayBuffer === 'function') {
        const arrayBuffer = await file.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    }
    return new Uint8Array(file);
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default unzipCore;
