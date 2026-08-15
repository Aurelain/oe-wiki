/**
 *
 */
function on(eventName, selector, handler) {
    if (selector.match(/^[a-z]/)) {
        selector = '.' + selector;
    }
    let all;
    if (typeof selector === 'string') {
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
