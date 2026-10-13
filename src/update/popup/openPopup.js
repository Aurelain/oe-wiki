import {DIFF_LIST} from '../SETTINGS.js';
import CSS_POPUP from './CSS_POPUP.js';
import buildDiff from './buildDiff.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
function openPreview(mirrorHub, parsedHub) {
    const popup = window.open('', 'Preview');
    if (!popup) {
        return;
    }
    const doc = popup.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Preview</title>
            <style>${CSS_POPUP}</style>
        </head>
        <body>
            <div class='${DIFF_LIST}'></div>
        </body>
        </html>
    `);
    doc.close();

    buildDiff(mirrorHub || {}, parsedHub, doc.querySelector('.' + DIFF_LIST));
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default openPreview;
