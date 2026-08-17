import fs from 'fs/promises';
import path from 'path';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function findFiles(rootPath, pattern, exclude, onlyFirstResult) {
    return find(rootPath, '', pattern, exclude, onlyFirstResult);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function find(rootPath, currentPath, pattern, exclude, onlyFirstResult) {
    const fullDirPath = path.join(rootPath, currentPath);
    const output = {};
    const entries = await fs.readdir(fullDirPath, {withFileTypes: true});
    for (const entry of entries) {
        const relativePath = path.join(currentPath, entry.name);
        if (exclude && relativePath.match(exclude)) {
            continue;
        }
        if (entry.isDirectory()) {
            const result = await find(rootPath, relativePath, pattern, exclude, onlyFirstResult);
            if (Buffer.isBuffer(result)) {
                return result;
            }
            Object.assign(output, result);
        } else if (entry.isFile()) {
            if (relativePath.match(pattern)) {
                const fullPath = path.join(fullDirPath, entry.name);
                const content = await fs.readFile(fullPath);
                if (onlyFirstResult) {
                    return content;
                }
                output[relativePath] = content;
            }
        }
    }
    return onlyFirstResult ? null : output;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default findFiles;
