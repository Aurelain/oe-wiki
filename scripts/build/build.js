import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import esbuild from 'esbuild';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const INPUT_DIR = 'src';
const OUTPUT_DIR = 'docs';
const INPUT_PATH = path.resolve(path.join(import.meta.dirname, '..', '..', INPUT_DIR));
const OUTPUT_PATH = path.resolve(path.join(import.meta.dirname, '..', '..', OUTPUT_DIR));

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 * Can be called either from the console (`node build foo.js`) or directly from code (`build('foo.js')`).
 * Examples:
 * - build()
 * - build('foo.js')
 * - build('foo.js', 'bar.js')
 * - build('foo.js', 'bar.js', '-o', 'dir1')
 * - build('-i', 'dir1')
 * - build('-i', 'dir1', '-o', 'dir2')
 * - build('--dev')
 */
async function build(...args) {
    const configurations = parseArguments(args);
    if (!configurations.length) {
        console.log('Nothing to build!');
        return;
    }

    for (const config of configurations) {
        await createBuild(config);
    }
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function parseArguments(args) {
    let isDev = false;
    let isMute = false;
    let inputArg = undefined;
    let outputArg = undefined;
    const freeArgs = [];
    for (const [i, arg] of args.entries()) {
        switch (arg) {
            case '-i':
                inputArg = args[i + 1];
                break;
            case '-o':
                outputArg = args[i + 1];
                break;
            case '--dev':
                isDev = true;
                break;
            case '--mute':
                isMute = true;
                break;
            default:
                if (arg === inputArg || arg === outputArg) {
                    continue;
                }
                if (arg.includes('node') || arg.includes('build')) {
                    continue;
                }
                freeArgs.push(arg);
        }
    }
    const outputDir = outputArg || OUTPUT_PATH;
    const entryPoints = inputArg ? collectEntryPoints(inputArg) : freeArgs;
    if (!inputArg && !freeArgs.length) {
        entryPoints.push(...collectEntryPoints(INPUT_PATH));
    }
    return generateConfigurations(entryPoints, outputDir, isDev, isMute);
}

/**
 *
 */
function generateConfigurations(entryPoints, outputArg, isDev, isMute) {
    const isMultiple = entryPoints.length > 0;
    const configurations = [];
    for (const entryPoint of entryPoints) {
        const fileName = path.basename(entryPoint);
        const stem = isMultiple ? fileName.replace(/\.[^.]*$/, '') : '';
        const outfile = path.join(outputArg, stem, fileName);
        configurations.push({
            entryPoint,
            outfile,
            isDev,
            isMute,
        });
    }
    return configurations;
}

/**
 *
 */
function collectEntryPoints(dirPath) {
    const output = [];
    const list = fs.readdirSync(dirPath);
    for (const item of list) {
        const longPath = path.join(dirPath, item);
        if (fs.statSync(longPath).isDirectory()) {
            const filePath = path.join(longPath, item + '.js');
            if (fs.existsSync(filePath)) {
                output.push(filePath);
            }
        }
    }
    return output;
}

/**
 *
 */
async function createBuild(config) {
    const {entryPoint, outfile, isDev, isMute} = config;
    const now = Date.now();

    await esbuild.build({
        entryPoints: [entryPoint],
        bundle: true,
        minify: !isDev,
        sourcemap: isDev,
        outfile,
    });

    !isMute && displaySummary(outfile, Date.now() - now);
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
process.argv.join('').includes('build') && (await build(...process.argv));
export default build;
