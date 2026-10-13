import mount from '../@shared/mount.jsx';
import App from './ui/App.jsx';

/**
 *
 */
function diff() {
    // Note: Increase the number to indicate this mount point should be protected.
    mount(App, '.diff-root', 0);
}

diff();
