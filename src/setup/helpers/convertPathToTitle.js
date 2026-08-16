import log from '../log.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const ILLEGAL_CHARACTERS = new RegExp('[ :]');

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *    Main/Foo~Bar_Hello.wiki    ->  Foo/Bar Hello
 *    Template/Foo~Bar.wiki      ->  Template:Foo/Bar
 *    Module/Foo~styles.css      ->  Modules:Foo/styles.css
 *    Main/Foo#Bar.wiki          ->  Foo:Bar
 *    File/Foo.png.wiki          ->  File:Foo.png
 *    File/Foo.png               ->  File:Foo.png.url
 */
function convertPathToTitle(filePath) {
    if (filePath.match(ILLEGAL_CHARACTERS)) {
        log('Path contains an illegal character!', filePath);
        return;
    }
    if (filePath.match('/.*?/')) {
        log('Path contains too many slashes!', filePath);
        return;
    }
    let title = filePath;
    title = title.replace(/^Main\//, '');
    title = title.replace('/', ':');
    title = title.replaceAll('~', '/');
    title = title.replaceAll('_', ' ');
    title = title.replaceAll('#', ':');
    title = title.replace(/\.lua$/, '');
    title = title.replace(/\.wiki$/, '');
    return title;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default convertPathToTitle;
