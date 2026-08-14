(()=>{function $(t,...o){let e=[],{length:n}=t;for(let i=0;i<n;i++)e.push(t[i],o[i]);e.pop();let r=e.join("");return r=r.replaceAll(/\/\*[\s\S]*?\*\//g,""),r=r.replaceAll(/\s\/\/.*/g,""),r}var l=$;var a="log-host",s="btn-game",c="btn-mirror",d="is-granted";var N=l`
    #setup .log-title {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup .${a} table {
        width: 100%;
        border-collapse: collapse;
    }

    #setup .${a} th {
        text-align: left;
    }

    #setup .${a} th,
    #setup .${a} td {
        border: solid 1px #cbced1;
        border-left:none;
        border-right:none;
        vertical-align: top;
        padding: 4px;
    }
    #setup .${a} th {
        border-top:none;
    }
    
    #setup .${a} table {
        border: solid 1px #cbced1;
    }

    #setup .${a} th {
        background: rgba(255, 255, 255, 0.1);
    }

    #setup .${a} td:nth-child(1) {
        width: 90px;
    }

    #setup .${a} td:nth-child(2),
    #setup .${a} th:nth-child(2) {
        width: 20px;
        text-align: center;
    }

    #setup .${a} td > div > div {
        cursor: pointer;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
        width: max-content;
    }

    #setup .${a} textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`,m=N;var H=l`
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

    #setup .${d}:after {
        content: ' ✅';
    }
    
    ${m}
`,S=H;var k=`
<style>${S}</style>
<div class='steps'>
    <!-- ==== SELECT =================================== -->
    <div class='step'>
        <div class='title'>1. Select game data files</div>
        <div class='about'>
            Make the internal data files available.<br/>
            Either give read-access to the local install directory of the game, or upload/drag-and-drop a zip archive.<br>
            <i>Note: Allowing read-access to the directory is easier because you only need to do it once,
            and you don't need to manually zip files.</i>
        </div>
        <div class='action'>
            Action: <button class='${s}'>Pick directory</button> or <button>Browse for zip</button> 
        </div>
    </div>
    <!-- ==== RETRIEVE =================================== -->
    <div class='step'>
        <div class='title'>2. Retrieve wiki data pages</div>
        <div class='about'>
            Temporarily download all relevant data pages from this wiki so they can be used as a comparison base. <br/>
            This step is optional, but highly recommended, because it gives awareness in the following steps and
            reduces the number of updates needed.</i>
        </div>
        <div class='action'>
            Action: <button>Retrieve</button> 
        </div>
    </div>
    <!-- ==== PREVIEW =================================== -->
    <div class='step'>
        <div class='title'>3. Preview changes</div>
        <div class='about'>
            Opens a popup window listing each page that is about to be updated, potentially highlighting differences.
        </div>
        <div class='action'>
            Action: <button>Preview</button> 
        </div>
    </div>
    <!-- ==== SAVE =================================== -->
    <div class='step'>
        <div class='title'>4. Save changes</div>
        <div class='about'>
            Writes the changes to each page using the current account, just as if you had done them manually.
        </div>
        <div class='action'>
            Action: <button>SAVE</button> 
        </div>
    </div>
</div>
<!-- ==== LOG =================================== -->
<div class='log-title'>Log:</div>
<div class='${a}'>
    <table class='wikitable'>
        <tr>
            <th>Timestamp</th>
            <th>\u{1F197}</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`,x=k;var E,T,C={info:"\u2139\uFE0F",warning:"\u26A0\uFE0F",error:"\u26D4"};function G(t,...o){let e=t.endsWith("!")?t.startsWith("!")?"error":"warning":"info";P(e,t,o)}function _(t){E=t,T=E.querySelector("table")}function P(t,o,e){let r=new Date().toLocaleTimeString("en-GB",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3}),i=document.createElement("tr");b(i,r),b(i,C[t]),b(i,B(o,e)),T.appendChild(i),console.log(o,...e)}function b(t,o){let e=document.createElement("td");o=o instanceof Node?o:document.createTextNode(o),e.appendChild(o),t.appendChild(e)}function B(t,o){if(t=t.replace(/^!/,""),!o.length)return document.createTextNode(t);let e=document.createElement("div"),n=document.createElement("div");n.innerHTML=t,n.onclick=function(){let i=this.nextElementSibling.style.display!=="none";this.nextElementSibling.style.display=i?"none":"block"},e.appendChild(n);let r=document.createElement("textarea");return r.style.display="none",r.innerHTML=JSON.stringify(o,null,4),e.appendChild(r),e}var f=G;var I=l`
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
    .list {
        background: #fff;
        color:#000;
        flex-grow: 1;
    }
    .${a} {
        height: 200px;
    }

    #setup .${s}:after,
    #setup .${c}:after {
        content: ' ⚠️';
    }

    #setup .${d}:after {
        content: ' ✅';
    }
    
    ${m}
`,D=I;var j=`
<style>${D}</style>
<div class='bar'>
    <button class='${s}'>Pick game directory</button>
    <button class='${c}'>Pick mirror directory</button> 
</div>
<div class='list'>
</div>
<div class='${a}'>
    <table class='wikitable'>
        <tr>
            <th>Timestamp</th>
            <th>\u{1F197}</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`,M=j;function V(t,o,e){let n;typeof o=="string"?n=Array.from(document.querySelectorAll(o)):Array.isArray(o)?n=o:n=[o];for(let r of n)r.addEventListener(t,e)}var h=V;var R=window.location.host||"localhost",p="store";async function g(t){if(!(await indexedDB.databases()).find(n=>n.name===R))return;let e=await O();if(!e.objectStoreNames.contains(p)){e.close();return}return new Promise((n,r)=>{let i=e.transaction(p).objectStore(p).get(t);i.onsuccess=()=>{n(i.result),e.close()},i.onerror=()=>{r(i.error),e.close()}})}async function v(t,o){let e=await O();return new Promise((n,r)=>{let i=e.transaction(p,"readwrite");i.objectStore(p).put(o,t),i.oncomplete=()=>{n(),e.close()},i.onerror=()=>{r(i.error),e.close()}})}function O(){return new Promise((t,o)=>{let e=indexedDB.open(R);e.onupgradeneeded=n=>n.target.result.createObjectStore(p),e.onsuccess=()=>t(e.result),e.onerror=()=>o(e.error)})}async function q(t,o){return new Promise(e=>{let n=r=>{let i=r.data&&typeof r.data=="object"?r.data:{};i.type===o.type&&(t.removeEventListener("message",n),e(i))};t.addEventListener("message",n),t.postMessage(o)})}var y=q;var A="gameDirHandle",L="mirrorDirHandle",u,z;async function W(){let t=document.getElementById("setup");if(!t)return;let o=t.dataset.dev==="1",e=t.dataset.parse;t.innerHTML=o?M:x,_(t.querySelector("."+a)),await w(),f("Initialized."),U(),await K(e),o&&await X()}function U(){h("click","."+s,F),h("click","."+c,J)}async function w(){let t=await g(A);document.querySelector("."+s)?.classList.toggle(d,!!t);let o=await g(L);document.querySelector("."+c)?.classList.toggle(d,!!o)}async function F(){let t;try{t=await window.showDirectoryPicker({mode:"read"})}catch{}t&&(await v(A,t),await w())}async function J(){let t;try{t=await window.showDirectoryPicker({mode:"read"})}catch{}t&&(await v(L,t),await w())}async function K(t){u=new Worker(`data:application/javascript,importScripts('${t}');`),u.addEventListener("error",()=>f("!Parser error!")),await y(u,{type:"ready"}),f("Connected to parser."),u.addEventListener("message",Q)}function Q(t){let o=t.data&&typeof t.data=="object"?t.data:{},{type:e}=o;console.log(`Parent received a "${e}" message!`)}async function X(){let{result:t}=await y(u,{type:"run"});z=t}W();})();
