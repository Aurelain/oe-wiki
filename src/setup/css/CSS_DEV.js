import styled from '../utils/styled.js';
import {LOG_HOST} from '../SETTINGS.js';
import CSS_LOG from './CSS_LOG.js';

// noinspection CssUnusedSymbol
const CSS_DEV = styled`
    html, body {
        padding:0;
        margin:0;
        height:100%;
    }
    #setup {
        background:#1e242c;
        color: #fff;
        height:100%;
        font-family: "JetBrains Mono", monospace;
        display:flex;
        flex-direction: column;
    }
    .bar {
        padding:8px;
    }
    .list {
        background: #fff;
        color:#000;
        flex-grow: 1;
    }
    .${LOG_HOST} {
        height: 200px;
    }

    ${CSS_LOG}
`;

export default CSS_DEV;
