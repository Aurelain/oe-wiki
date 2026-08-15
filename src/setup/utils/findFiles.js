// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function findFiles(dirHandle, pattern, exclude, onlyFirstResult) {
    return find(dirHandle, '', pattern, exclude, onlyFirstResult);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function find(dirHandle, currentPath, pattern, exclude, onlyFirstResult) {
    currentPath += currentPath ? '/' : '';
    const output = {};
    const entries = await getFiles(dirHandle);
    for (const [name, handle] of entries) {
        const fullPath = currentPath + name;
        if (exclude && fullPath.match(exclude)) {
            continue;
        }
        if (handle.kind === 'directory') {
            const result = await find(handle, fullPath, pattern, exclude, onlyFirstResult);
            if (result instanceof File) {
                return result;
            }
            Object.assign(output, result);
        } else {
            if (fullPath.match(pattern)) {
                const file = await handle.getFile();
                if (onlyFirstResult) {
                    return file;
                }
                output[fullPath] = file;
            }
        }
    }
    return output;
}

/**
 *
 */
async function getFiles(dirHandle) {
    const entries = [];
    try {
        for await (const entry of dirHandle.entries()) {
            entries.push(entry);
        }
    } catch (error) {}
    return entries;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default findFiles;
