/**
 *
 */
function on(eventName, selector, handler) {
    let all;
    if (typeof selector === 'string') {
        if (selector.match(/^[a-z]/)) {
            selector = '.' + selector;
        }
        all = Array.from(document.querySelectorAll(selector));
    } else if (Array.isArray(selector)) {
        all = selector;
    } else {
        all = [selector];
    }
    for (const element of all) {
        element.addEventListener(eventName, handler);
    }
}

export default on;
