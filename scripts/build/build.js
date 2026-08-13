import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import esbuild from 'esbuild';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const DESTINATION_DIR = 'docs';
const args = Array.from(process.argv);
const isDev = args.includes('--dev');

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function build() {
    const {target, destinationDir} = decidePaths();

    removeOldJsFileFrom(destinationDir); // also removes any *.map file
    await createBuild(target, destinationDir);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function decidePaths() {
    const target = args.find((arg) => arg.startsWith('src'));
    const parentDirName = path.basename(path.dirname(target));
    const destinationDir = path.join(DESTINATION_DIR, parentDirName);
    return {target, destinationDir};
}

/**
 *
 */
function removeOldJsFileFrom(dirPath) {
    for (const file of fs.readdirSync(dirPath)) {
        if (file.endsWith('js')) {
            const filePath = path.join(dirPath, file);
            fs.unlinkSync(filePath);
            const mapFilePath = filePath + '.map';
            if (fs.existsSync(mapFilePath)) {
                fs.unlinkSync(mapFilePath);
            }
        }
    }
}

/**
 *
 */
async function createBuild(target, outdir) {
    const outfile = path.join(outdir, path.basename(target));
    await esbuild.build({
        entryPoints: [target],
        bundle: true,
        minify: !isDev,
        sourcemap: isDev,
        outfile,
    });
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
build();
