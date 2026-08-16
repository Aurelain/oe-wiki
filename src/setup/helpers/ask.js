import log from '../log.js';
import to from './to.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================
let settings;

// =====================================================================================================================
//  P U B L I C
// =====================================================================================================================
/**
 *
 */
async function ask(params) {
    if (!settings) {
        console.log('Please call applySettings() prior to asking!');
        return;
    }

    // Headers:
    const options = {
        method: detectMethod(params),
    };

    // Parameters:
    const url = new URL(settings.API_URL);
    const requestParams = adaptParams(params); // removes `method` and may return formData
    if (options.method === 'GET') {
        url.search = requestParams.toString();
    } else {
        options.body = requestParams;
    }

    // Actual request:
    const [response, fetchError] = await to(fetch(url, options));
    if (!response) {
        log('Failed to fetch!', fetchError);
        return;
    }

    // Output:
    const [json, jsonError] = await to(response.json());
    if (!json) {
        log('Invalid json!', jsonError);
        return;
    }
    return json;
}

/**
 *
 */
function applySettings(config) {
    const {API_URL} = config;
    settings = {API_URL};
}

// =====================================================================================================================
//  P R I V A T E
// =====================================================================================================================
/**
 *
 */
function detectMethod(params) {
    return !params.method || params.method === 'GET' ? 'GET' : 'POST';
}

/**
 *
 */
function adaptParams(params) {
    let adapted = {...params, format: 'json', formatversion: 2};
    const {method} = adapted;
    delete adapted.method;

    if (method === 'FORM') {
        const formData = new FormData();
        for (const key in adapted) {
            const value = adapted[key];
            if (Array.isArray(value)) {
                formData.append(key, value[0], value[1]);
            } else {
                formData.append(key, value);
            }
        }
        return formData;
    }

    return new URLSearchParams(adapted);
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export {ask, applySettings};
