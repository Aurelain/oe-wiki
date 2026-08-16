import CSS_USER from '../css/CSS_USER.js';
import {BTN_GAME, BTN_PREVIEW, BTN_RETRIEVE, BTN_SAVE, LOG_HOST} from '../SETTINGS.js';

const HTML_USER = `
<style>${CSS_USER}</style>
<div class='steps'>
    <!-- ==== SELECT =================================== -->
    <div class='step'>
        <div class='title'>1. Select game data directory</div>
        <div class='about'>
            Give read-access to the local install directory of the game so the parser can choose what files it needs.
        </div>
        <div class='action'>
            <button class='${BTN_GAME}'>Pick directory</button> 
        </div>
    </div>
    <!-- ==== RETRIEVE =================================== -->
    <div class='step'>
        <div class='title'>2. Retrieve wiki data pages</div>
        <div class='about'>
            Temporarily download all relevant data pages from this wiki so they can be used as a comparison base. <br/>
            This step is optional, but recommended, because it gives awareness in the following steps and
            reduces the number of updates needed.</i>
        </div>
        <div class='action'>
            <button class='${BTN_RETRIEVE}'>Retrieve <progress/></button> 
        </div>
    </div>
    <!-- ==== PREVIEW =================================== -->
    <div class='step'>
        <div class='title'>3. Preview changes</div>
        <div class='about'>
            Open a popup window listing each page that is about to be updated, potentially highlighting differences.
        </div>
        <div class='action'>
            <button class='${BTN_PREVIEW}'>Preview <progress/></button> 
        </div>
    </div>
    <!-- ==== SAVE =================================== -->
    <div class='step'>
        <div class='title'>4. Save changes</div>
        <div class='about'>
            Write the changes to each page using the current account, just as if you had done them manually.
        </div>
        <div class='action'>
            <button class='${BTN_SAVE}'>SAVE <progress/></button> 
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
