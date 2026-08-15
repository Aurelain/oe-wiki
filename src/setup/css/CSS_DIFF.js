import styled from '../utils/styled.js';
import {
    DIFF_CHANGED,
    DIFF_COLLAPSED,
    DIFF_CONTENT,
    DIFF_IDENTICAL,
    DIFF_LABEL,
    DIFF_NEW,
    DIFF_PATH,
} from '../SETTINGS.js';

// noinspection CssUnusedSymbol
const CSS_DIFF = styled`
    .${DIFF_PATH} {
        font-weight: bold;
        background: silver;
        padding: 8px;
        cursor: pointer;
    }

    .${DIFF_LABEL} {
        float: right;
        border: solid 1px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        padding: 4px;
        margin-right: -5px;
        margin-top: -5px;
    }

    .${DIFF_PATH}.${DIFF_NEW} {
        background: rgba(0, 0, 255, 0.2);
        border-top: solid 1px rgba(0, 0, 255, 0.4);
    }

    .${DIFF_PATH}.${DIFF_IDENTICAL} {
        background: rgba(0, 255, 0, 0.2);
        border-top: solid 1px rgba(0, 255, 0, 0.4);
    }

    .${DIFF_PATH}.${DIFF_CHANGED} {
        background: rgba(255, 100, 0, 0.2);
        border-top: solid 1px rgba(255, 100, 0, 0.4);
    }

    .${DIFF_CONTENT} {
        display: flex;
        flex-direction: row;
    }

    .${DIFF_CONTENT}.${DIFF_COLLAPSED} {
        display:none;
    }

    .${DIFF_CONTENT} pre {
        margin:0;
        flex: 1;
        min-width: 0;
        padding: 8px;
    }

    .${DIFF_CONTENT} pre:nth-child(2) {
        border-left: solid 2px rgba(255, 100, 0, 0.2);
    }
`;

export default CSS_DIFF;
