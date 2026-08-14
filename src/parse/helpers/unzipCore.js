// import fs from 'node:fs';
// import path from 'node:path';
// import {unzipSync} from 'fflate';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function unzipCore() {
    // const buffer = fs.readFileSync(OE_ZIP_PATH);
    // const unzipped = unzipSync(buffer);
    // if (!outputDirPath) {
    //     return unzipped;
    // }
    //
    // for (const [filePath, fileData] of Object.entries(unzipped)) {
    //     const fullPath = path.join(outputDirPath, filePath);
    //     if (filePath.endsWith('/')) {
    //         fs.mkdirSync(fullPath, {recursive: true});
    //         continue;
    //     }
    //     fs.mkdirSync(path.dirname(fullPath), {recursive: true});
    //     fs.writeFileSync(fullPath, fileData);
    // }

    return {};
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default unzipCore;
