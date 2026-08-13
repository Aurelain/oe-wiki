import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import esbuild from 'esbuild';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const DESTINATION_DIR = 'docs';
const argv = Array.from(process.argv);
const isDev = argv.includes('--dev');

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function build(...parameters) {
    const now = Date.now();
    const {target, destinationDir} = decidePaths([...parameters, ...argv]);

    removeOldJsFileFrom(destinationDir); // also removes any *.map file
    const outfile = await createBuild(target, destinationDir);

    displaySummary(outfile, Date.now() - now);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function decidePaths(args) {
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
    return outfile;
}

/**
 *
 */
function displaySummary(outfile, milliseconds) {
    const name = path.basename(outfile);
    const size = (fs.statSync(outfile).size / 1024).toFixed(2);
    // const duration = (milliseconds / 1000).toFixed(2);
    console.log(`Build created "${name}" (${size} KB) in ${milliseconds} ms.`);
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
process.argv.join('').includes('build') && (await build());
export default build;
