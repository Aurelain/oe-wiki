import {BTN_GAME, LOG_HOST} from '../SETTINGS.js';
import CSS_DEV from '../css/CSS_DEV.js';

const HTML_DEV = `
<style>${CSS_DEV}</style>
<div class='bar'>
    <button class='${BTN_GAME}'>Pick game directory</button>
    <button>Pick mirror directory</button> 
</div>
<div class='list'>
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
