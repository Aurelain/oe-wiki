// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const DB_NAME = window.location.host || 'localhost';
const STORE_NAME = 'store';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function readFromDb(key) {
    const dbs = await indexedDB.databases();
    if (!dbs.find((db) => db.name === DB_NAME)) {
        return;
    }
    const db = await openDb();
    if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.close();
        return;
    }
    return new Promise((resolve, reject) => {
        const request = db.transaction(STORE_NAME).objectStore(STORE_NAME).get(key);
        request.onsuccess = () => {
            resolve(request.result);
            db.close();
        };
        request.onerror = () => {
            reject(request.error);
            db.close();
        };
    });
}

/**
 *
 */
async function writeToDb(key, value) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(value, key);
        tx.oncomplete = () => {
            resolve();
            db.close();
        };
        tx.onerror = () => {
            reject(tx.error);
            db.close();
        };
    });
}

/**
 *
 */
function deleteDatabase() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.deleteDatabase(DB_NAME);
        req.onsuccess = () => {
            resolve();
            console.log('Database deleted successfully.');
        };
        req.onerror = () => reject(req.error);
        req.onblocked = () => console.warn('Database deletion blocked.');
    });
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function openDb() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME);
        req.onupgradeneeded = (e) => e.target.result.createObjectStore(STORE_NAME);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export {readFromDb, writeToDb, deleteDatabase};
