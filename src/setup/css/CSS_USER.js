import styled from '../utils/styled.js';
import CSS_COMMON from './CSS_COMMON.js';
import {IS_GRANTED} from '../SETTINGS.js';

// noinspection CssUnusedSymbol
const CSS_USER = styled`
    #setup {
        color: #fff;
    }
    
    #setup .step {
        padding: 16px;
        border-top: solid 1px #cbced1;
    }
    
    #setup .step:first-child {
        border: none;
    }
    
    #setup .title {
        font-size: 150%;
        font-weight: bold;
        color: #c8b36c;
    }
    
    #setup .action {
        margin-top:8px;
    }

    #setup .${IS_GRANTED}:after {
        content: ' ✅';
    }
    
    ${CSS_COMMON}
`;

export default CSS_USER;
