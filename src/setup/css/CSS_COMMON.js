import styled from '../utils/styled.js';
import {DIFF_LIST, IS_DISABLED, LOG_HOST, STATUS_OK, STATUS_PROGRESS, STATUS_WARNING} from '../SETTINGS.js';

// noinspection CssUnusedSymbol
const CSS_COMMON = styled`
    /* ================== GENERAL ================== */

    #setup.${IS_DISABLED} {
        pointer-events: none;
    }

    #setup button {
        padding: 4px 6px;
        cursor: pointer;
        font-size: inherit;
    }
    
    #setup button[disabled] {
        cursor: default;
    }

    #setup button progress {
        display: none;
    }

    /* ================== STATUSES ================== */

    #setup .${STATUS_OK}:after {
        content: ' ✅';
    }

    #setup .${STATUS_WARNING}:after {
        content: ' ⚠️';
    }

    #setup .${STATUS_PROGRESS} progress {
        display: inline-block;
    }

    /* ================== LOG ================== */

    #setup .log-title {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup .${LOG_HOST} {
        overflow-y: scroll;
        height: 200px;
        flex-shrink: 0;
    }

    #setup .${DIFF_LIST} textarea {
        font-family: "JetBrains Mono", monospace;
    }

    #setup .${LOG_HOST} table {
        width: 100%;
        border-collapse: collapse;
        margin: 0;
    }

    #setup .${LOG_HOST} th {
        text-align: left;
    }

    #setup .${LOG_HOST} th,
    #setup .${LOG_HOST} td {
        border: solid 1px rgba(255, 255, 255, 0.1);
        border-left: none;
        border-right: none;
        vertical-align: top;
        padding: 4px;
    }

    #setup .${LOG_HOST} th {
        border-top: none;
    }

    #setup .${LOG_HOST} table {
        border: solid 1px rgba(255, 255, 255, 0.1);
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
    }

    #setup .${LOG_HOST} textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`;

export default CSS_COMMON;
