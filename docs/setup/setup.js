(()=>{function g(t,...e){let o=[],{length:i}=t;for(let r=0;r<i;r++)o.push(t[r],e[r]);o.pop();let n=o.join("");return n=n.replaceAll(/\/\*[\s\S]*?\*\//g,""),n=n.replaceAll(/\s\/\/.*/g,""),n}var s=g;var d="log-host",l="log-title";var b=s`
    #setup {
        color: #fff;
    }

    #setup table {
        width: 100%;
        border-collapse: collapse;
        border: solid 1px #cbced1;
    }

    #setup th {
        text-align: left;
    }

    #setup th,
    #setup td {
        border: solid 1px #cbced1;
        vertical-align: top;
        padding: 4px;
    }

    #setup .${l} {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup .${d} th {
        background: rgba(255, 255, 255, 0.1);
    }

    #setup .${d} td:nth-child(1) {
        width: 90px;
    }

    #setup .${d} td:nth-child(2),
    #setup .${d} th:nth-child(2) {
        width: 20px;
        text-align: center;
    }

    #setup .${d} td > div > div {
        cursor: pointer;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
        width: max-content;
    }

    #setup textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`,p=b;var x=`
<style>${p}</style>
<table>
    <tr>
        <th>Step</th>        
        <th>Action</th>        
        <th>Status</th>
    </tr>
    <tr>
        <td>1. Select game data files</td>        
        <td><button>Pick</button> or <button>Browse</button></td>
        <td></td>
    </tr>
    <tr>
        <td>2. Retrieve wiki data pages</td>        
        <td><button>Retrieve</button></td>
        <td></td>
    </tr>
    <tr>
        <td>3. Preview changes</td>        
        <td><button>Preview</button></td>
        <td></td>
    </tr>
    <tr>
        <td>4. Save changes</td>        
        <td><button>Save</button></td>
        <td></td>
    </tr>
</table>
<div class='${l}'>Log:</div>
<div class='${d}'>
    <table>
        <tr>
            <th>Timestamp</th>
            <th>\u{1F197}</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`,u=x;var h,f,S={info:"\u2139\uFE0F",warning:"\u26A0\uFE0F",error:"\u26D4"};function T(t,...e){let o=t.endsWith("!")?t.startsWith("!")?"error":"warning":"info";L(o,t,e)}function m(t){h=t,f=h.querySelector("table")}function L(t,e,o){let n=new Date().toLocaleTimeString("en-GB",{hour12:!1}),r=document.createElement("tr");a(r,n),a(r,S[t]),a(r,y(e,o)),f.appendChild(r)}function a(t,e){let o=document.createElement("td");e=e instanceof Node?e:document.createTextNode(e),o.appendChild(e),t.appendChild(o)}function y(t,e){if(!e.length)return document.createTextNode(t);let o=document.createElement("div"),i=document.createElement("div");i.innerHTML=t,i.onclick=function(){let r=this.nextElementSibling.style.display!=="none";this.nextElementSibling.style.display=r?"none":"block"},o.appendChild(i);let n=document.createElement("textarea");return n.style.display="none",n.innerHTML=JSON.stringify(e,null,4),o.appendChild(n),o}var c=T;async function v(){let t=document.getElementById("setup");if(!t)return;let e=t.innerHTML;t.innerHTML=u,m(t.querySelector("."+d)),c("Initialized.");let o=O(e);c("config:",o)}function O(t){t=t.replaceAll(/<.*?>/g,"");try{return JSON.parse(t)}catch(e){return c("!Failed to parse JSON!",e),{}}}v();})();
