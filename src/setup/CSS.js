import styled from './styled.js';

// noinspection CssUnusedSymbol
const CSS = styled`
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

    #setup .log-title {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup table {
        width: 100%;
        border-collapse: collapse;
    }

    #setup th {
        text-align: left;
    }

    #setup th,
    #setup td {
        border: solid 1px #cbced1;
        border-left:none;
        border-right:none;
        vertical-align: top;
        padding: 4px;
    }
    #setup th {
        border-top:none;
    }
    
    #setup table {
        border: solid 1px #cbced1;
    }

    #setup th {
        background: rgba(255, 255, 255, 0.1);
    }

    #setup td:nth-child(1) {
        width: 90px;
    }

    #setup td:nth-child(2),
    #setup th:nth-child(2) {
        width: 20px;
        text-align: center;
    }

    #setup td > div > div {
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
