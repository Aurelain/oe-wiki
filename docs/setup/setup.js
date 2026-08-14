(()=>{function F(t,...e){let o=[],{length:n}=t;for(let i=0;i<n;i++)o.push(t[i],e[i]);o.pop();let a=o.join("");return a=a.replaceAll(/\/\*[\s\S]*?\*\//g,""),a=a.replaceAll(/\s\/\/.*/g,""),a}var u=F;var r="log-host",s="btn-game",c="btn-mirror",w="btn-preview",d="is-granted";var W=u`
    #setup .log-title {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup .${r} table {
        width: 100%;
        border-collapse: collapse;
    }

    #setup .${r} th {
        text-align: left;
    }

    #setup .${r} th,
    #setup .${r} td {
        border: solid 1px #cbced1;
        border-left:none;
        border-right:none;
        vertical-align: top;
        padding: 4px;
    }
    #setup .${r} th {
        border-top:none;
    }
    
    #setup .${r} table {
        border: solid 1px #cbced1;
    }

    #setup .${r} th {
        background: rgba(255, 255, 255, 0.1);
    }

    #setup .${r} td:nth-child(1) {
        width: 90px;
    }

    #setup .${r} td:nth-child(2),
    #setup .${r} th:nth-child(2) {
        width: 20px;
        text-align: center;
    }

    #setup .${r} td > div > div {
        cursor: pointer;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
        width: max-content;
    }

    #setup .${r} textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`,v=W;var z=u`
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
    
    ${v}
`,M=z;var U=`
<style>${M}</style>
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
            Action: <button class='${w}'>Preview</button> 
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
<div class='${r}'>
    <table class='wikitable'>
        <tr>
            <th>Timestamp</th>
            <th>\u{1F197}</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`,O=U;var N,$,J={info:"\u2139\uFE0F",warning:"\u26A0\uFE0F",error:"\u26D4"};function K(t,...e){let o=t.endsWith("!")?t.startsWith("!")?"error":"warning":"info";Q(o,t,e)}function A(t){N=t,$=N.querySelector("table")}function Q(t,e,o){let a=new Date().toLocaleTimeString("en-GB",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3}),i=document.createElement("tr");_(i,a),_(i,J[t]),_(i,X(e,o)),$.appendChild(i),console.log(e,...o)}function _(t,e){let o=document.createElement("td");e=e instanceof Node?e:document.createTextNode(e),o.appendChild(e),t.appendChild(o)}function X(t,e){if(t=t.replace(/^!/,""),!e.length)return document.createTextNode(t);let o=document.createElement("div"),n=document.createElement("div");n.innerHTML=t,n.onclick=function(){let i=this.nextElementSibling.style.display!=="none";this.nextElementSibling.style.display=i?"none":"block"},o.appendChild(n);let a=document.createElement("textarea");return a.style.display="none",a.innerHTML=JSON.stringify(e,null,4),o.appendChild(a),o}var f=K;var Y=u`
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
    .${r} {
        height: 200px;
    }

    #setup .${s}:after,
    #setup .${c}:after {
        content: ' ⚠️';
    }

    #setup .${d}:after {
        content: ' ✅';
    }
    
    ${v}
`,L=Y;var Z=`
<style>${L}</style>
<div class='bar'>
    <button class='${s}'>Pick game directory</button>
    <button class='${c}'>Pick mirror directory</button> 
</div>
<div class='list'>
</div>
<div class='${r}'>
    <table class='wikitable'>
        <tr>
            <th>Timestamp</th>
            <th>\u{1F197}</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`,H=Z;function tt(t,e,o){let n;typeof e=="string"?n=Array.from(document.querySelectorAll(e)):Array.isArray(e)?n=e:n=[e];for(let a of n)a.addEventListener(t,o)}var E=tt;var P=window.location.host||"localhost",m="store";async function b(t){if(!(await indexedDB.databases()).find(n=>n.name===P))return;let o=await G();if(!o.objectStoreNames.contains(m)){o.close();return}return new Promise((n,a)=>{let i=o.transaction(m).objectStore(m).get(t);i.onsuccess=()=>{n(i.result),o.close()},i.onerror=()=>{a(i.error),o.close()}})}async function k(t,e){let o=await G();return new Promise((n,a)=>{let i=o.transaction(m,"readwrite");i.objectStore(m).put(e,t),i.oncomplete=()=>{n(),o.close()},i.onerror=()=>{a(i.error),o.close()}})}function G(){return new Promise((t,e)=>{let o=indexedDB.open(P);o.onupgradeneeded=n=>n.target.result.createObjectStore(m),o.onsuccess=()=>t(o.result),o.onerror=()=>e(o.error)})}async function et(t,e,o){return new Promise(n=>{let a=i=>{let l=i.data&&typeof i.data=="object"?i.data:{};l.type===e&&(console.log(`Parent received a "${e}" reply.`),t.removeEventListener("message",a),n(l.payload))};t.addEventListener("message",a),t.postMessage({type:e,payload:o})})}var D=et;function ot(t,e,o){t.postMessage({type:e,payload:o})}var C=ot;async function nt(t,e,o,n){return I(t,"",e,o,n)}async function I(t,e,o,n,a){e+=e?"/":"";let i={},l=await it(t);for(let[T,g]of l){let y=e+T;if(!(n&&y.match(n))){if(g.kind==="directory"){let p=await I(g,y,o,n,a);if(p instanceof File)return p;Object.assign(i,p)}else if(y.match(o)){let p=await g.getFile();if(a)return p;i[y]=p}}}return i}async function it(t){let e=[];try{for await(let o of t.entries())e.push(o)}catch{}return e}var B=nt;var x="gameDirHandle",q="mirrorDirHandle",h,at;async function rt(){let t=document.getElementById("setup");if(!t)return;let e=t.dataset.dev==="1",o=t.dataset.parse;t.innerHTML=e?H:O,A(t.querySelector("."+r)),await R(),f("Initialized."),st(),await pt(o),e&&await j()}async function R(){let t=await b(x),e=await S(t);document.querySelector("."+s)?.classList.toggle(d,e);let o=await b(q),n=await S(o);document.querySelector("."+c)?.classList.toggle(d,n)}async function S(t){return await t?.queryPermission()==="granted"}function st(){E("click","."+s,ct),E("click","."+c,dt),E("click","."+w,lt)}async function ct(){await V(x)}async function dt(){await V(q)}async function lt(){await j()}async function V(t){let e=await b(t);if(e&&!await S(e)){if(await e.requestPermission(),await S(e)){await R();return}}try{e=await window.showDirectoryPicker({mode:"read"})}catch{}e&&(await k(t,e),await R())}async function pt(t){h=new Worker(`data:application/javascript,importScripts('${t}');`),h.addEventListener("error",()=>f("!Parser error!")),await D(h,"ready"),f("Connected to parser."),h.addEventListener("message",ut)}async function ut(t){let e=t.data&&typeof t.data=="object"?t.data:{},{type:o,payload:n}=e;if(o==="find"){console.log(`Parent received a "${o}" inquiry.`);let a=await b(x),[i,l,T]=n,g=await B(a,i,l,T);C(h,"find",g)}}async function j(){await(await b(x))?.queryPermission()==="granted"&&await ft()}async function ft(){f("Started parsing...");let t=await D(h,"run");f("Received parsing results.",Object.keys(t)),at=t}rt();})();
