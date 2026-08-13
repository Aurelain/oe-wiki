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

    removeOldJsFileFrom(destinationDir);
    const {filePath} = await createBundle(target, destinationDir);
    updateIndexHtml(destinationDir, filePath);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function decidePaths() {
    const target = args.find((arg) => arg.startsWith('src'));
    const parentDirName = target.split('/').at(-2).toString();
    const destinationDir = path.join(DESTINATION_DIR, parentDirName);
    return {target, destinationDir};
}

/**
 *
 */
function removeOldJsFileFrom(dirPath) {
    const jsFilePath = findJsFile(dirPath);
    if (jsFilePath) {
        fs.unlinkSync(jsFilePath);
        const mapFilePath = jsFilePath + '.map';
        if (fs.existsSync(mapFilePath)) {
            fs.unlinkSync(mapFilePath);
        }
    }
}

/**
 *
 */
function findJsFile(dirPath) {
    for (const file of fs.readdirSync(dirPath)) {
        if (file.endsWith('js')) {
            return path.join(dirPath, file);
        }
    }
}

/**
 *
 */
async function createBundle(target, outdir) {
    await esbuild.build({
        entryPoints: [target],
        bundle: true,
        minify: !isDev,
        sourcemap: isDev,
        outdir,
        entryNames: '[name]-[hash]',
    });

    const filePath = findJsFile(outdir);
    return {
        filePath,
        content: fs.readFileSync(filePath, 'utf8'),
    };
}

/**
 *
 */
function updateIndexHtml(dirPath, jsFilePath) {
    const indexPath = path.join(dirPath, 'index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const jsFileName = jsFilePath.split(path.sep).pop().toString();
    const freshContent = indexContent.replace(/(['"]).*?js(['"])/, `$1${jsFileName}$2`);
    fs.writeFileSync(indexPath, freshContent, 'utf8');
}

// =====================================================================================================================
//  R U N
// =====================================================================================================================
build();
