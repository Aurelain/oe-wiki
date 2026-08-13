(()=>{function g(t,...e){let i=[],{length:s}=t;for(let n=0;n<s;n++)i.push(t[n],e[n]);i.pop();let o=i.join("");return o=o.replaceAll(/\/\*[\s\S]*?\*\//g,""),o=o.replaceAll(/\s\/\/.*/g,""),o}var r=g;var v=r`
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
`,c=v;var a="log-host";var f=`
<style>${c}</style>
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
            Action: <button>Pick directory</button> or <button>Browse for zip</button> 
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
`,p=f;var u,h,m={info:"\u2139\uFE0F",warning:"\u26A0\uFE0F",error:"\u26D4"};function y(t,...e){let i=t.endsWith("!")?t.startsWith("!")?"error":"warning":"info";x(i,t,e)}function b(t){u=t,h=u.querySelector("table")}function x(t,e,i){let o=new Date().toLocaleTimeString("en-GB",{hour12:!1}),n=document.createElement("tr");l(n,o),l(n,m[t]),l(n,w(e,i)),h.appendChild(n)}function l(t,e){let i=document.createElement("td");e=e instanceof Node?e:document.createTextNode(e),i.appendChild(e),t.appendChild(i)}function w(t,e){if(!e.length)return document.createTextNode(t);let i=document.createElement("div"),s=document.createElement("div");s.innerHTML=t,s.onclick=function(){let n=this.nextElementSibling.style.display!=="none";this.nextElementSibling.style.display=n?"none":"block"},i.appendChild(s);let o=document.createElement("textarea");return o.style.display="none",o.innerHTML=JSON.stringify(e,null,4),i.appendChild(o),i}var d=y;async function S(){let t=document.getElementById("setup");if(!t)return;let e=t.innerHTML;t.innerHTML=p,b(t.querySelector("."+a)),d("Initialized.");let i=T(e);d("config:",i)}function T(t){t=t.replaceAll(/<.*?>/g,"");try{return JSON.parse(t)}catch(e){return d("!Failed to parse JSON!",e),{}}}S();})();
