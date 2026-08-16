import styled from '../utils/styled.js';
import CSS_COMMON from './CSS_COMMON.js';

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
        margin-top: 8px;
    }

    ${CSS_COMMON}
`;

export default CSS_USER;
