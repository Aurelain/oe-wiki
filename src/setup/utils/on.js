/**
 *
 */
function on(name, selector, handler) {
    let all;
    if (typeof selector === 'string') {
        all = Array.from(document.querySelectorAll(selector));
    } else if (Array.isArray(selector)) {
        all = selector;
    } else {
        all = [selector];
    }
    for (const element of all) {
        element.addEventListener(name, handler);
    }
}

export default on;
