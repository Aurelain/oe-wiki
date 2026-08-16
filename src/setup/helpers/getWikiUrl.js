/**
 *
 */
function getWikiUrl() {
    let wikiUrl = document.location.href.replace(/[^\/]*$/, '');
    if (wikiUrl.includes('localhost')) {
        wikiUrl = 'https://wiki.hoodedhorse.com/Heroes_of_Might_and_Magic_Olden_Era/';
    }
    return wikiUrl + 'api.php';
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default getWikiUrl;
