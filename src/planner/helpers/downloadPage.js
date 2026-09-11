import {WIKI_URL} from './compression/SETTINGS.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function downloadPage(page, lang) {
    lang = lang || 'en';
    const suffix = lang === 'en' ? '' : '/' + lang;
    const url = WIKI_URL + page + suffix;

    let response;
    try {
        response = await fetch(url);
    } catch (e) {
        console.warn(`Failed to fetch ${url}!`);
        return '';
    }
    return await response.text();
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default downloadPage;
