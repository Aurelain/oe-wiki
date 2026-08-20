import log from '../log.js';
import convertPathToTitle from './convertPathToTitle.js';
import {ask} from './ask.js';

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function savePages(parserResult, mirrorResult) {
    const updates = findUpdates(parserResult, mirrorResult);
    if (!updates.length) {
        log('All pages are already updated.');
        return true;
    }

    // Csrf
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
        log('Cannot get csrf token!');
        return false;
    }

    // Save each page:
    let count = 0;
    for (const {title, content} of updates) {
        const isSuccess = await savePage(title, content, csrfToken);
        if (isSuccess) {
            count++;
        }
    }
    log(`Successfully saved ${count} pages.`);
    return true;
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function findUpdates(parserResult, mirrorResult) {
    const output = [];
    mirrorResult = mirrorResult || {};
    for (const path in parserResult) {
        const content = parserResult[path];
        const mirrorContent = mirrorResult[path];
        if (content !== mirrorContent) {
            const title = convertPathToTitle(path);
            output.push({title, content});
        }
    }
    return output;
}

/**
 *
 */
async function getCsrfToken() {
    const csrfResponse = await ask({
        action: 'query',
        meta: 'tokens',
    });
    return csrfResponse?.query?.tokens?.csrftoken;
}

/**
 *
 */
async function savePage(title, content, csrfToken) {
    log(`Saving content for "${title}"...`);
    const editResponse = await ask({
        method: 'POST',
        action: 'edit',
        title,
        text: content,
        token: csrfToken,
    });
    if (editResponse?.edit?.result !== 'Success') {
        log('Save failed!', title, content);
        return false;
    }
    return true;
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default savePages;
