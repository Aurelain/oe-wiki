import {BTN_GAME, BTN_MIRROR, DIFF_LIST, LOG_HOST} from '../SETTINGS.js';
import CSS_DEV from '../css/CSS_DEV.js';

const HTML_DEV = `
<style>${CSS_DEV}</style>
<div class='bar'>
    <button class='${BTN_GAME}'>Pick game directory</button>
    <button class='${BTN_MIRROR}'>Pick mirror directory</button> 
</div>
<div class='${DIFF_LIST}'>
</div>
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

export default HTML_DEV;
