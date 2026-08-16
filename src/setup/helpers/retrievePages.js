import convertPathToTitle from './convertPathToTitle.js';
import getWikiUrl from './getWikiUrl.js';
import log from '../log.js';
import to from './to.js';

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
    console.log('titles:', titles);
    const result = await fetchWikiPages(titles);
    console.log('result:', result);
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
async function fetchWikiPages(titles) {
    const results = {};
    const url = getWikiUrl();
    for (let i = 0; i < titles.length; i += CHUNK_SIZE) {
        const chunk = titles.slice(i, i + CHUNK_SIZE);

        // Url
        const params = new URLSearchParams({
            action: 'query',
            format: 'json',
            prop: 'revisions',
            rvprop: 'content',
            rvslots: 'main',
            titles: chunk.join('|'),
            origin: '*',
        });
        const endpoint = url + '?' + params.toString();

        // Fetch
        const [response, fetchError] = await to(fetch(endpoint));
        if (!response) {
            return log('Retrieval failed!', chunk, fetchError);
        }

        // Json
        const [data, jsonError] = await to(response.json());
        if (!data) {
            return log('Unexpected data!', data, jsonError.message);
        }

        const pages = data.query?.pages || {};

        for (const pageId in pages) {
            const page = pages[pageId];
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
