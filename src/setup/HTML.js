import CSS from './CSS.js';

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
`;

export default HTML;
