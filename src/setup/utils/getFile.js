// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * Resolves a nested file path from a root directory handle and returns the File object.
 * @param {FileSystemDirectoryHandle} dirHandle - The starting root directory handle.
 * @param {string} relativePath - Path like "subfolder/nested/data.json" or "/a/b/c.txt"
 * @returns {Promise<File|undefined>}
 */
async function getFile(dirHandle, relativePath) {
    const segments = relativePath.split('/');
    const fileName = segments.pop();

    let currentDir = dirHandle;
    for (const segment of segments) {
        try {
            currentDir = await currentDir.getDirectoryHandle(segment);
        } catch (err) {
            return;
        }
    }

    let fileHandle;
    try {
        fileHandle = await currentDir.getFileHandle(fileName);
    } catch (err) {
        return;
    }

    try {
        return await fileHandle.getFile();
    } catch (err) {}
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getFile;
