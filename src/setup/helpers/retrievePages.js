import convertPathToTitle from './convertPathToTitle.js';
import log from '../log.js';
import convertTitleToPath from './convertTitleToPath.js';
import {ask} from './ask.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
const CHUNK_SIZE = 50;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function retrievePages(parserResult) {
    const titles = Object.keys(parserResult).map((key) => convertPathToTitle(key));
    const result = await fetchWikiPages(titles);
    if (!result) {
        return;
    }
    const output = {};
    for (const key in result) {
        const path = convertTitleToPath(key);
        if (path) {
            const content = result[key];
            if (content === undefined) {
                log('Invalid page content!', key);
            } else {
                output[path] = result[key];
            }
        }
    }
    log(`Retrieved ${Object.keys(output).length} pages.`);
    return output;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function fetchWikiPages(titles) {
    const results = {};
    for (let i = 0; i < titles.length; i += CHUNK_SIZE) {
        const endIndex = Math.min(i + CHUNK_SIZE, titles.length);
        const chunk = titles.slice(i, endIndex);
        log(`Retrieving ${i + 1}-${endIndex} of ${titles.length} pages...`);

        const data = await ask({
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            rvslots: 'main',
            titles: chunk.join('|'),
            origin: '*',
        });
        if (!data) {
            continue;
        }

        const pages = data.query?.pages || [];

        for (const page of pages) {
            if (!page.missing) {
                results[page.title] = page.revisions?.[0]?.slots?.main?.content;
            }
        }
    }

    return results;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default retrievePages;
