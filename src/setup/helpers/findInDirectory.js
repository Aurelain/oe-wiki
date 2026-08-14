// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function findInDirectory(dirHandle) {
    const output = [];
    const entries = await getFiles(dirHandle);
    for (const [name, handle] of entries) {
        console.log('name:', name);
        // const fullPath = `${currentPath}/${name}`;
        // if (!ast || evaluateNode(ast, fullPath)) {
        //     if (handle.kind === 'directory') {
        //         output.push(...(await findInDirectory(handle, null, fullPath, root)));
        //     } else {
        //         output.push({
        //             file: await handle.getFile(),
        //             path: fullPath,
        //             root,
        //         });
        //     }
        // } else {
        //     if (handle.kind === 'directory') {
        //         output.push(...(await findInDirectory(handle, ast, fullPath, root)));
        //     }
        // }
    }
    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
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
export default findInDirectory;
