import {render} from 'preact';

/**
 *
 */
function mount(App, root, props) {
    root.innerHTML = '';
    render(<App {...props} />, root);
    root.style.position = 'relative';
    root.style.visibility = 'visible';
}

export default mount;
