import checkPermission from './checkPermission.js';
import {readFromDb, writeToDb} from '../utils/LocalDb.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function refreshDirHandle(key) {
    let dirHandle = await readFromDb(key);
    if (dirHandle) {
        if (await checkPermission(dirHandle)) {
            // nothing, the user already has the permission, but clicked to change the path
        } else {
            await dirHandle.requestPermission();
            if (await checkPermission(dirHandle)) {
                return; // by clicking this button, the user managed to renew their permission
            } else {
                // nothing, the user failed to renew, so we pass-on to change the path
            }
        }
    }
    try {
        dirHandle = await window.showDirectoryPicker({mode: 'read'});
    } catch (e) {}
    if (dirHandle) {
        await writeToDb(key, dirHandle);
    }
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default refreshDirHandle;
