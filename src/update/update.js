import mount from '../@shared/mount.jsx';
import App from './ui/App.jsx';

/**
 *
 */
function update() {
    // Note: Increase the number to indicate this mount point should be protected.
    mount(App, '.update-tool', 0);
}

update();
