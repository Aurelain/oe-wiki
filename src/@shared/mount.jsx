import {render} from 'preact';

/**
 *
 */
function mount(App, root, props) {
    root.innerHTML = '';
    render(<App {...props} />, root);
}

export default mount;
