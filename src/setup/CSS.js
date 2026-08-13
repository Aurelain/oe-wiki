import styled from './styled.js';
import {LOG_HOST, LOG_TITLE} from './SETTINGS.js';

// noinspection CssUnusedSymbol
const CSS = styled`
    #setup {
        color: #fff;
    }

    #setup table {
        width: 100%;
        border-collapse: collapse;
        border: solid 1px #cbced1;
    }

    #setup th {
        text-align: left;
    }

    #setup th,
    #setup td {
        border: solid 1px #cbced1;
        vertical-align: top;
        padding: 4px;
    }

    #setup .${LOG_TITLE} {
        margin-top: 32px;
        padding: 8px 0;
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
        border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
        width: max-content;
    }

    #setup textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`;

export default CSS;
