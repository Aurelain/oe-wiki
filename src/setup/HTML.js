import CSS from './CSS.js';
import {LOG_HOST, LOG_TITLE} from './SETTINGS.js';

const HTML = `
<style>${CSS}</style>
<table>
    <tr>
        <th>Step</th>        
        <th>Action</th>        
        <th>Status</th>
    </tr>
    <tr>
        <td>1. Select game data files</td>        
        <td><button>Pick</button> or <button>Browse</button></td>
        <td></td>
    </tr>
    <tr>
        <td>2. Retrieve wiki data pages</td>        
        <td><button>Retrieve</button></td>
        <td></td>
    </tr>
    <tr>
        <td>3. Preview changes</td>        
        <td><button>Preview</button></td>
        <td></td>
    </tr>
    <tr>
        <td>4. Save changes</td>        
        <td><button>Save</button></td>
        <td></td>
    </tr>
</table>
<div class='${LOG_TITLE}'>Log:</div>
<div class='${LOG_HOST}'>
    <table>
        <tr>
            <th>Timestamp</th>
            <th>🆗</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`;

export default HTML;
