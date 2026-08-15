import styled from '../utils/styled.js';
import {BTN_GAME, BTN_MIRROR, DIFF_LIST, IS_GRANTED, LOG_HOST} from '../SETTINGS.js';
import CSS_COMMON from './CSS_COMMON.js';
import CSS_DIFF from './CSS_DIFF.js';

// noinspection CssUnusedSymbol
const CSS_DEV = styled`
    html, body {
        padding:0;
        margin:0;
        height:100%;
        font-size: 13px;
        background:#1e242c;
        color: #fff;
        font-family: "JetBrains Mono", monospace;
    }
    #setup {
        height:100%;
        display:flex;
        flex-direction: column;
    }
    .bar {
        padding:8px;
    }
    .${DIFF_LIST} {
        background: #fff;
        color:#000;
        flex-grow: 1;
        overflow-y: scroll;
    }
    .${LOG_HOST} {
        height: 200px;
        flex-shrink: 0;
    }

    #setup .${BTN_GAME}:after,
    #setup .${BTN_MIRROR}:after {
        content: ' ⚠️';
    }

    #setup .${IS_GRANTED}:after {
        content: ' ✅';
    }
    
    ${CSS_COMMON}
    ${CSS_DIFF}
`;

export default CSS_DEV;
