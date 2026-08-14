import CSS_USER from '../css/CSS_USER.js';
import {BTN_GAME, BTN_PREVIEW, LOG_HOST} from '../SETTINGS.js';

const HTML_USER = `
<style>${CSS_USER}</style>
<div class='steps'>
    <!-- ==== SELECT =================================== -->
    <div class='step'>
        <div class='title'>1. Select game data files</div>
        <div class='about'>
            Make the internal data files available.<br/>
            Either give read-access to the local install directory of the game, or upload/drag-and-drop a zip archive.<br>
            <i>Note: Allowing read-access to the directory is easier because you only need to do it once,
            and you don't need to manually zip files.</i>
        </div>
        <div class='action'>
            Action: <button class='${BTN_GAME}'>Pick directory</button> or <button>Browse for zip</button> 
        </div>
    </div>
    <!-- ==== RETRIEVE =================================== -->
    <div class='step'>
        <div class='title'>2. Retrieve wiki data pages</div>
        <div class='about'>
            Temporarily download all relevant data pages from this wiki so they can be used as a comparison base. <br/>
            This step is optional, but highly recommended, because it gives awareness in the following steps and
            reduces the number of updates needed.</i>
        </div>
        <div class='action'>
            Action: <button>Retrieve</button> 
        </div>
    </div>
    <!-- ==== PREVIEW =================================== -->
    <div class='step'>
        <div class='title'>3. Preview changes</div>
        <div class='about'>
            Opens a popup window listing each page that is about to be updated, potentially highlighting differences.
        </div>
        <div class='action'>
            Action: <button class='${BTN_PREVIEW}'>Preview</button> 
        </div>
    </div>
    <!-- ==== SAVE =================================== -->
    <div class='step'>
        <div class='title'>4. Save changes</div>
        <div class='about'>
            Writes the changes to each page using the current account, just as if you had done them manually.
        </div>
        <div class='action'>
            Action: <button>SAVE</button> 
        </div>
    </div>
</div>
<!-- ==== LOG =================================== -->
<div class='log-title'>Log:</div>
<div class='${LOG_HOST}'>
    <table class='wikitable'>
        <tr>
            <th>Timestamp</th>
            <th>🆗</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`;

export default HTML_USER;
