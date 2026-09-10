import styled from './utils/styled.js';

// noinspection CssUnusedSymbol
const CSS = styled`

    .planner .portrait {
        position: absolute;
        left: 0;
        top: -5px;
        //background: red;
        width: 140px;
        height: 140px;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        -webkit-mask: url(#compoundMask);
        mask: url(#compoundMask);
        cursor:pointer;
        //filter: drop-shadow(0 0 2px rgba(255,255,255,0.5));
    }

    .planner .portrait img {
        width:100%;
    }
    
    .planner .level {
        position: absolute;
        left: 29px;
        top: 90px;
        transform: scale(0.5);
        border-radius: 50%;
        cursor: pointer;
    }
    
    .planner .heroes-menu {
        display:none;
        position:absolute;
        left:152px;
        top: 5px;
        width:508px;
        height:681px;
        background:#1f3756;
        border:solid 1px #BCB096;
        filter: drop-shadow(0 0 0.3rem black);
        border-radius:8px;
        overflow:auto;
    }
    
    .planner .heroes-menu img {
        width:56px;
        cursor:pointer;
    }
`;

export default CSS;
