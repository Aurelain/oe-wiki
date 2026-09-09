import CSS from './CSS.js';

const HTML = `
<style>${CSS}</style>
<div class='content'>
    <img class='bg' src='@bgUrl' alt='empty background'/>
    
    <svg width='0' height='0' style='position:absolute'>
        <defs>
            <mask id="compoundMask" maskContentUnits="objectBoundingBox">
                <rect x="0" y="0" width="1" height="0.35" fill="white" />
                <circle cx="0.54" cy="0.58" r="0.41" fill="white" />
            </mask>
        </defs>
    </svg>
    <img class='portrait' />
    
    <div class='level'>
        <img src='@level' alt='level'/>
    </div>

</div>  
`;

export default HTML;
