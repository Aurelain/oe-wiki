import {render} from 'preact';

/**
 *
 */
function mount(App, root, setup) {
    root.innerHTML = '';
    render(<App setup={setup} />, root);
    root.style.position = 'relative';
    root.style.visibility = 'visible';
}

export default mount;
