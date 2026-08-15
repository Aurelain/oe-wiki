import styled from '../utils/styled.js';
import {LOG_HOST} from '../SETTINGS.js';

// noinspection CssUnusedSymbol
const CSS_COMMON = styled`
    textarea, pre {
        font-family: "JetBrains Mono", monospace;
    }
    
    #setup .log-title {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup .${LOG_HOST} {
        overflow-y:scroll;
    }

    #setup .${LOG_HOST} table {
        width: 100%;
        border-collapse: collapse;
    }

    #setup .${LOG_HOST} th {
        text-align: left;
    }

    #setup .${LOG_HOST} th,
    #setup .${LOG_HOST} td {
        border: solid 1px rgba(255,255,255,0.1);
        border-left:none;
        border-right:none;
        vertical-align: top;
        padding: 4px;
    }
    #setup .${LOG_HOST} th {
        border-top:none;
    }
    
    #setup .${LOG_HOST} table {
        border: solid 1px #cbced1;
    }

    #setup .${LOG_HOST} th {
        background: rgba(255, 255, 255, 0.1);
    }

    #setup .${LOG_HOST} td:nth-child(1) {
        width: 90px;
    }

    #setup .${LOG_HOST} td:nth-child(2),
    #setup .${LOG_HOST} th:nth-child(2) {
        width: 20px;
        text-align: center;
    }

    #setup .${LOG_HOST} td > div > div {
        cursor: pointer;
        color: yellow;
        //border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
    }

    #setup .${LOG_HOST} textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`;

export default CSS_COMMON;
