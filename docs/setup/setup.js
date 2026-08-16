(()=>{var it=Object.create;var ke=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var st=Object.getOwnPropertyNames;var ot=Object.getPrototypeOf,lt=Object.prototype.hasOwnProperty;var ct=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}};var ft=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of st(t))!lt.call(e,a)&&a!==r&&ke(e,a,{get:()=>t[a],enumerable:!(i=at(t,a))||i.enumerable});return e};var ht=(e,t,r)=>(r=e!=null?it(ot(e)):{},ft(t||!e||!e.__esModule?ke(r,"default",{value:e,enumerable:!0}):r,e));var je=ct((nn,te)=>{var c=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},_=-1,w=1,d=0;c.Diff=function(e,t){return[e,t]};c.prototype.diff_main=function(e,t,r,i){typeof i>"u"&&(this.Diff_Timeout<=0?i=Number.MAX_VALUE:i=new Date().getTime()+this.Diff_Timeout*1e3);var a=i;if(e==null||t==null)throw new Error("Null input. (diff_main)");if(e==t)return e?[new c.Diff(d,e)]:[];typeof r>"u"&&(r=!0);var n=r,s=this.diff_commonPrefix(e,t),o=e.substring(0,s);e=e.substring(s),t=t.substring(s),s=this.diff_commonSuffix(e,t);var l=e.substring(e.length-s);e=e.substring(0,e.length-s),t=t.substring(0,t.length-s);var f=this.diff_compute_(e,t,n,a);return o&&f.unshift(new c.Diff(d,o)),l&&f.push(new c.Diff(d,l)),this.diff_cleanupMerge(f),f};c.prototype.diff_compute_=function(e,t,r,i){var a;if(!e)return[new c.Diff(w,t)];if(!t)return[new c.Diff(_,e)];var n=e.length>t.length?e:t,s=e.length>t.length?t:e,o=n.indexOf(s);if(o!=-1)return a=[new c.Diff(w,n.substring(0,o)),new c.Diff(d,s),new c.Diff(w,n.substring(o+s.length))],e.length>t.length&&(a[0][0]=a[2][0]=_),a;if(s.length==1)return[new c.Diff(_,e),new c.Diff(w,t)];var l=this.diff_halfMatch_(e,t);if(l){var f=l[0],h=l[1],u=l[2],g=l[3],p=l[4],v=this.diff_main(f,u,r,i),b=this.diff_main(h,g,r,i);return v.concat([new c.Diff(d,p)],b)}return r&&e.length>100&&t.length>100?this.diff_lineMode_(e,t,i):this.diff_bisect_(e,t,i)};c.prototype.diff_lineMode_=function(e,t,r){var i=this.diff_linesToChars_(e,t);e=i.chars1,t=i.chars2;var a=i.lineArray,n=this.diff_main(e,t,!1,r);this.diff_charsToLines_(n,a),this.diff_cleanupSemantic(n),n.push(new c.Diff(d,""));for(var s=0,o=0,l=0,f="",h="";s<n.length;){switch(n[s][0]){case w:l++,h+=n[s][1];break;case _:o++,f+=n[s][1];break;case d:if(o>=1&&l>=1){n.splice(s-o-l,o+l),s=s-o-l;for(var u=this.diff_main(f,h,!1,r),g=u.length-1;g>=0;g--)n.splice(s,0,u[g]);s=s+u.length}l=0,o=0,f="",h="";break}s++}return n.pop(),n};c.prototype.diff_bisect_=function(e,t,r){for(var i=e.length,a=t.length,n=Math.ceil((i+a)/2),s=n,o=2*n,l=new Array(o),f=new Array(o),h=0;h<o;h++)l[h]=-1,f[h]=-1;l[s+1]=0,f[s+1]=0;for(var u=i-a,g=u%2!=0,p=0,v=0,b=0,A=0,m=0;m<n&&!(new Date().getTime()>r);m++){for(var S=-m+p;S<=m-v;S+=2){var E=s+S,y;S==-m||S!=m&&l[E-1]<l[E+1]?y=l[E+1]:y=l[E-1]+1;for(var k=y-S;y<i&&k<a&&e.charAt(y)==t.charAt(k);)y++,k++;if(l[E]=y,y>i)v+=2;else if(k>a)p+=2;else if(g){var I=s+u-S;if(I>=0&&I<o&&f[I]!=-1){var T=i-f[I];if(y>=T)return this.diff_bisectSplit_(e,t,y,k,r)}}}for(var R=-m+b;R<=m-A;R+=2){var I=s+R,T;R==-m||R!=m&&f[I-1]<f[I+1]?T=f[I+1]:T=f[I-1]+1;for(var O=T-R;T<i&&O<a&&e.charAt(i-T-1)==t.charAt(a-O-1);)T++,O++;if(f[I]=T,T>i)A+=2;else if(O>a)b+=2;else if(!g){var E=s+u-R;if(E>=0&&E<o&&l[E]!=-1){var y=l[E],k=s+y-E;if(T=i-T,y>=T)return this.diff_bisectSplit_(e,t,y,k,r)}}}}return[new c.Diff(_,e),new c.Diff(w,t)]};c.prototype.diff_bisectSplit_=function(e,t,r,i,a){var n=e.substring(0,r),s=t.substring(0,i),o=e.substring(r),l=t.substring(i),f=this.diff_main(n,s,!1,a),h=this.diff_main(o,l,!1,a);return f.concat(h)};c.prototype.diff_linesToChars_=function(e,t){var r=[],i={};r[0]="";function a(l){for(var f="",h=0,u=-1,g=r.length;u<l.length-1;){u=l.indexOf(`
`,h),u==-1&&(u=l.length-1);var p=l.substring(h,u+1);(i.hasOwnProperty?i.hasOwnProperty(p):i[p]!==void 0)?f+=String.fromCharCode(i[p]):(g==n&&(p=l.substring(h),u=l.length),f+=String.fromCharCode(g),i[p]=g,r[g++]=p),h=u+1}return f}var n=4e4,s=a(e);n=65535;var o=a(t);return{chars1:s,chars2:o,lineArray:r}};c.prototype.diff_charsToLines_=function(e,t){for(var r=0;r<e.length;r++){for(var i=e[r][1],a=[],n=0;n<i.length;n++)a[n]=t[i.charCodeAt(n)];e[r][1]=a.join("")}};c.prototype.diff_commonPrefix=function(e,t){if(!e||!t||e.charAt(0)!=t.charAt(0))return 0;for(var r=0,i=Math.min(e.length,t.length),a=i,n=0;r<a;)e.substring(n,a)==t.substring(n,a)?(r=a,n=r):i=a,a=Math.floor((i-r)/2+r);return a};c.prototype.diff_commonSuffix=function(e,t){if(!e||!t||e.charAt(e.length-1)!=t.charAt(t.length-1))return 0;for(var r=0,i=Math.min(e.length,t.length),a=i,n=0;r<a;)e.substring(e.length-a,e.length-n)==t.substring(t.length-a,t.length-n)?(r=a,n=r):i=a,a=Math.floor((i-r)/2+r);return a};c.prototype.diff_commonOverlap_=function(e,t){var r=e.length,i=t.length;if(r==0||i==0)return 0;r>i?e=e.substring(r-i):r<i&&(t=t.substring(0,r));var a=Math.min(r,i);if(e==t)return a;for(var n=0,s=1;;){var o=e.substring(a-s),l=t.indexOf(o);if(l==-1)return n;s+=l,(l==0||e.substring(a-s)==t.substring(0,s))&&(n=s,s++)}};c.prototype.diff_halfMatch_=function(e,t){if(this.Diff_Timeout<=0)return null;var r=e.length>t.length?e:t,i=e.length>t.length?t:e;if(r.length<4||i.length*2<r.length)return null;var a=this;function n(v,b,A){for(var m=v.substring(A,A+Math.floor(v.length/4)),S=-1,E="",y,k,I,T;(S=b.indexOf(m,S+1))!=-1;){var R=a.diff_commonPrefix(v.substring(A),b.substring(S)),O=a.diff_commonSuffix(v.substring(0,A),b.substring(0,S));E.length<O+R&&(E=b.substring(S-O,S)+b.substring(S,S+R),y=v.substring(0,A-O),k=v.substring(A+R),I=b.substring(0,S-O),T=b.substring(S+R))}return E.length*2>=v.length?[y,k,I,T,E]:null}var s=n(r,i,Math.ceil(r.length/4)),o=n(r,i,Math.ceil(r.length/2)),l;if(!s&&!o)return null;o?s?l=s[4].length>o[4].length?s:o:l=o:l=s;var f,h,u,g;e.length>t.length?(f=l[0],h=l[1],u=l[2],g=l[3]):(u=l[0],g=l[1],f=l[2],h=l[3]);var p=l[4];return[f,h,u,g,p]};c.prototype.diff_cleanupSemantic=function(e){for(var t=!1,r=[],i=0,a=null,n=0,s=0,o=0,l=0,f=0;n<e.length;)e[n][0]==d?(r[i++]=n,s=l,o=f,l=0,f=0,a=e[n][1]):(e[n][0]==w?l+=e[n][1].length:f+=e[n][1].length,a&&a.length<=Math.max(s,o)&&a.length<=Math.max(l,f)&&(e.splice(r[i-1],0,new c.Diff(_,a)),e[r[i-1]+1][0]=w,i--,i--,n=i>0?r[i-1]:-1,s=0,o=0,l=0,f=0,a=null,t=!0)),n++;for(t&&this.diff_cleanupMerge(e),this.diff_cleanupSemanticLossless(e),n=1;n<e.length;){if(e[n-1][0]==_&&e[n][0]==w){var h=e[n-1][1],u=e[n][1],g=this.diff_commonOverlap_(h,u),p=this.diff_commonOverlap_(u,h);g>=p?(g>=h.length/2||g>=u.length/2)&&(e.splice(n,0,new c.Diff(d,u.substring(0,g))),e[n-1][1]=h.substring(0,h.length-g),e[n+1][1]=u.substring(g),n++):(p>=h.length/2||p>=u.length/2)&&(e.splice(n,0,new c.Diff(d,h.substring(0,p))),e[n-1][0]=w,e[n-1][1]=u.substring(0,u.length-p),e[n+1][0]=_,e[n+1][1]=h.substring(p),n++),n++}n++}};c.prototype.diff_cleanupSemanticLossless=function(e){function t(p,v){if(!p||!v)return 6;var b=p.charAt(p.length-1),A=v.charAt(0),m=b.match(c.nonAlphaNumericRegex_),S=A.match(c.nonAlphaNumericRegex_),E=m&&b.match(c.whitespaceRegex_),y=S&&A.match(c.whitespaceRegex_),k=E&&b.match(c.linebreakRegex_),I=y&&A.match(c.linebreakRegex_),T=k&&p.match(c.blanklineEndRegex_),R=I&&v.match(c.blanklineStartRegex_);return T||R?5:k||I?4:m&&!E&&y?3:E||y?2:m||S?1:0}for(var r=1;r<e.length-1;){if(e[r-1][0]==d&&e[r+1][0]==d){var i=e[r-1][1],a=e[r][1],n=e[r+1][1],s=this.diff_commonSuffix(i,a);if(s){var o=a.substring(a.length-s);i=i.substring(0,i.length-s),a=o+a.substring(0,a.length-s),n=o+n}for(var l=i,f=a,h=n,u=t(i,a)+t(a,n);a.charAt(0)===n.charAt(0);){i+=a.charAt(0),a=a.substring(1)+n.charAt(0),n=n.substring(1);var g=t(i,a)+t(a,n);g>=u&&(u=g,l=i,f=a,h=n)}e[r-1][1]!=l&&(l?e[r-1][1]=l:(e.splice(r-1,1),r--),e[r][1]=f,h?e[r+1][1]=h:(e.splice(r+1,1),r--))}r++}};c.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;c.whitespaceRegex_=/\s/;c.linebreakRegex_=/[\r\n]/;c.blanklineEndRegex_=/\n\r?\n$/;c.blanklineStartRegex_=/^\r?\n\r?\n/;c.prototype.diff_cleanupEfficiency=function(e){for(var t=!1,r=[],i=0,a=null,n=0,s=!1,o=!1,l=!1,f=!1;n<e.length;)e[n][0]==d?(e[n][1].length<this.Diff_EditCost&&(l||f)?(r[i++]=n,s=l,o=f,a=e[n][1]):(i=0,a=null),l=f=!1):(e[n][0]==_?f=!0:l=!0,a&&(s&&o&&l&&f||a.length<this.Diff_EditCost/2&&s+o+l+f==3)&&(e.splice(r[i-1],0,new c.Diff(_,a)),e[r[i-1]+1][0]=w,i--,a=null,s&&o?(l=f=!0,i=0):(i--,n=i>0?r[i-1]:-1,l=f=!1),t=!0)),n++;t&&this.diff_cleanupMerge(e)};c.prototype.diff_cleanupMerge=function(e){e.push(new c.Diff(d,""));for(var t=0,r=0,i=0,a="",n="",s;t<e.length;)switch(e[t][0]){case w:i++,n+=e[t][1],t++;break;case _:r++,a+=e[t][1],t++;break;case d:r+i>1?(r!==0&&i!==0&&(s=this.diff_commonPrefix(n,a),s!==0&&(t-r-i>0&&e[t-r-i-1][0]==d?e[t-r-i-1][1]+=n.substring(0,s):(e.splice(0,0,new c.Diff(d,n.substring(0,s))),t++),n=n.substring(s),a=a.substring(s)),s=this.diff_commonSuffix(n,a),s!==0&&(e[t][1]=n.substring(n.length-s)+e[t][1],n=n.substring(0,n.length-s),a=a.substring(0,a.length-s))),t-=r+i,e.splice(t,r+i),a.length&&(e.splice(t,0,new c.Diff(_,a)),t++),n.length&&(e.splice(t,0,new c.Diff(w,n)),t++),t++):t!==0&&e[t-1][0]==d?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++,i=0,r=0,a="",n="";break}e[e.length-1][1]===""&&e.pop();var o=!1;for(t=1;t<e.length-1;)e[t-1][0]==d&&e[t+1][0]==d&&(e[t][1].substring(e[t][1].length-e[t-1][1].length)==e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),o=!0):e[t][1].substring(0,e[t+1][1].length)==e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),o=!0)),t++;o&&this.diff_cleanupMerge(e)};c.prototype.diff_xIndex=function(e,t){var r=0,i=0,a=0,n=0,s;for(s=0;s<e.length&&(e[s][0]!==w&&(r+=e[s][1].length),e[s][0]!==_&&(i+=e[s][1].length),!(r>t));s++)a=r,n=i;return e.length!=s&&e[s][0]===_?n:n+(t-a)};c.prototype.diff_prettyHtml=function(e){for(var t=[],r=/&/g,i=/</g,a=/>/g,n=/\n/g,s=0;s<e.length;s++){var o=e[s][0],l=e[s][1],f=l.replace(r,"&amp;").replace(i,"&lt;").replace(a,"&gt;").replace(n,"&para;<br>");switch(o){case w:t[s]='<ins style="background:#e6ffe6;">'+f+"</ins>";break;case _:t[s]='<del style="background:#ffe6e6;">'+f+"</del>";break;case d:t[s]="<span>"+f+"</span>";break}}return t.join("")};c.prototype.diff_text1=function(e){for(var t=[],r=0;r<e.length;r++)e[r][0]!==w&&(t[r]=e[r][1]);return t.join("")};c.prototype.diff_text2=function(e){for(var t=[],r=0;r<e.length;r++)e[r][0]!==_&&(t[r]=e[r][1]);return t.join("")};c.prototype.diff_levenshtein=function(e){for(var t=0,r=0,i=0,a=0;a<e.length;a++){var n=e[a][0],s=e[a][1];switch(n){case w:r+=s.length;break;case _:i+=s.length;break;case d:t+=Math.max(r,i),r=0,i=0;break}}return t+=Math.max(r,i),t};c.prototype.diff_toDelta=function(e){for(var t=[],r=0;r<e.length;r++)switch(e[r][0]){case w:t[r]="+"+encodeURI(e[r][1]);break;case _:t[r]="-"+e[r][1].length;break;case d:t[r]="="+e[r][1].length;break}return t.join("	").replace(/%20/g," ")};c.prototype.diff_fromDelta=function(e,t){for(var r=[],i=0,a=0,n=t.split(/\t/g),s=0;s<n.length;s++){var o=n[s].substring(1);switch(n[s].charAt(0)){case"+":try{r[i++]=new c.Diff(w,decodeURI(o))}catch{throw new Error("Illegal escape in diff_fromDelta: "+o)}break;case"-":case"=":var l=parseInt(o,10);if(isNaN(l)||l<0)throw new Error("Invalid number in diff_fromDelta: "+o);var f=e.substring(a,a+=l);n[s].charAt(0)=="="?r[i++]=new c.Diff(d,f):r[i++]=new c.Diff(_,f);break;default:if(n[s])throw new Error("Invalid diff operation in diff_fromDelta: "+n[s])}}if(a!=e.length)throw new Error("Delta length ("+a+") does not equal source text length ("+e.length+").");return r};c.prototype.match_main=function(e,t,r){if(e==null||t==null||r==null)throw new Error("Null input. (match_main)");return r=Math.max(0,Math.min(r,e.length)),e==t?0:e.length?e.substring(r,r+t.length)==t?r:this.match_bitap_(e,t,r):-1};c.prototype.match_bitap_=function(e,t,r){if(t.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var i=this.match_alphabet_(t),a=this;function n(y,k){var I=y/t.length,T=Math.abs(r-k);return a.Match_Distance?I+T/a.Match_Distance:T?1:I}var s=this.Match_Threshold,o=e.indexOf(t,r);o!=-1&&(s=Math.min(n(0,o),s),o=e.lastIndexOf(t,r+t.length),o!=-1&&(s=Math.min(n(0,o),s)));var l=1<<t.length-1;o=-1;for(var f,h,u=t.length+e.length,g,p=0;p<t.length;p++){for(f=0,h=u;f<h;)n(p,r+h)<=s?f=h:u=h,h=Math.floor((u-f)/2+f);u=h;var v=Math.max(1,r-h+1),b=Math.min(r+h,e.length)+t.length,A=Array(b+2);A[b+1]=(1<<p)-1;for(var m=b;m>=v;m--){var S=i[e.charAt(m-1)];if(p===0?A[m]=(A[m+1]<<1|1)&S:A[m]=(A[m+1]<<1|1)&S|((g[m+1]|g[m])<<1|1)|g[m+1],A[m]&l){var E=n(p,m-1);if(E<=s)if(s=E,o=m-1,o>r)v=Math.max(1,2*r-o);else break}}if(n(p+1,r)>s)break;g=A}return o};c.prototype.match_alphabet_=function(e){for(var t={},r=0;r<e.length;r++)t[e.charAt(r)]=0;for(var r=0;r<e.length;r++)t[e.charAt(r)]|=1<<e.length-r-1;return t};c.prototype.patch_addContext_=function(e,t){if(t.length!=0){if(e.start2===null)throw Error("patch not initialized");for(var r=t.substring(e.start2,e.start2+e.length1),i=0;t.indexOf(r)!=t.lastIndexOf(r)&&r.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)i+=this.Patch_Margin,r=t.substring(e.start2-i,e.start2+e.length1+i);i+=this.Patch_Margin;var a=t.substring(e.start2-i,e.start2);a&&e.diffs.unshift(new c.Diff(d,a));var n=t.substring(e.start2+e.length1,e.start2+e.length1+i);n&&e.diffs.push(new c.Diff(d,n)),e.start1-=a.length,e.start2-=a.length,e.length1+=a.length+n.length,e.length2+=a.length+n.length}};c.prototype.patch_make=function(e,t,r){var i,a;if(typeof e=="string"&&typeof t=="string"&&typeof r>"u")i=e,a=this.diff_main(i,t,!0),a.length>2&&(this.diff_cleanupSemantic(a),this.diff_cleanupEfficiency(a));else if(e&&typeof e=="object"&&typeof t>"u"&&typeof r>"u")a=e,i=this.diff_text1(a);else if(typeof e=="string"&&t&&typeof t=="object"&&typeof r>"u")i=e,a=t;else if(typeof e=="string"&&typeof t=="string"&&r&&typeof r=="object")i=e,a=r;else throw new Error("Unknown call format to patch_make.");if(a.length===0)return[];for(var n=[],s=new c.patch_obj,o=0,l=0,f=0,h=i,u=i,g=0;g<a.length;g++){var p=a[g][0],v=a[g][1];switch(!o&&p!==d&&(s.start1=l,s.start2=f),p){case w:s.diffs[o++]=a[g],s.length2+=v.length,u=u.substring(0,f)+v+u.substring(f);break;case _:s.length1+=v.length,s.diffs[o++]=a[g],u=u.substring(0,f)+u.substring(f+v.length);break;case d:v.length<=2*this.Patch_Margin&&o&&a.length!=g+1?(s.diffs[o++]=a[g],s.length1+=v.length,s.length2+=v.length):v.length>=2*this.Patch_Margin&&o&&(this.patch_addContext_(s,h),n.push(s),s=new c.patch_obj,o=0,h=u,l=f);break}p!==w&&(l+=v.length),p!==_&&(f+=v.length)}return o&&(this.patch_addContext_(s,h),n.push(s)),n};c.prototype.patch_deepCopy=function(e){for(var t=[],r=0;r<e.length;r++){var i=e[r],a=new c.patch_obj;a.diffs=[];for(var n=0;n<i.diffs.length;n++)a.diffs[n]=new c.Diff(i.diffs[n][0],i.diffs[n][1]);a.start1=i.start1,a.start2=i.start2,a.length1=i.length1,a.length2=i.length2,t[r]=a}return t};c.prototype.patch_apply=function(e,t){if(e.length==0)return[t,[]];e=this.patch_deepCopy(e);var r=this.patch_addPadding(e);t=r+t+r,this.patch_splitMax(e);for(var i=0,a=[],n=0;n<e.length;n++){var s=e[n].start2+i,o=this.diff_text1(e[n].diffs),l,f=-1;if(o.length>this.Match_MaxBits?(l=this.match_main(t,o.substring(0,this.Match_MaxBits),s),l!=-1&&(f=this.match_main(t,o.substring(o.length-this.Match_MaxBits),s+o.length-this.Match_MaxBits),(f==-1||l>=f)&&(l=-1))):l=this.match_main(t,o,s),l==-1)a[n]=!1,i-=e[n].length2-e[n].length1;else{a[n]=!0,i=l-s;var h;if(f==-1?h=t.substring(l,l+o.length):h=t.substring(l,f+this.Match_MaxBits),o==h)t=t.substring(0,l)+this.diff_text2(e[n].diffs)+t.substring(l+o.length);else{var u=this.diff_main(o,h,!1);if(o.length>this.Match_MaxBits&&this.diff_levenshtein(u)/o.length>this.Patch_DeleteThreshold)a[n]=!1;else{this.diff_cleanupSemanticLossless(u);for(var g=0,p,v=0;v<e[n].diffs.length;v++){var b=e[n].diffs[v];b[0]!==d&&(p=this.diff_xIndex(u,g)),b[0]===w?t=t.substring(0,l+p)+b[1]+t.substring(l+p):b[0]===_&&(t=t.substring(0,l+p)+t.substring(l+this.diff_xIndex(u,g+b[1].length))),b[0]!==_&&(g+=b[1].length)}}}}}return t=t.substring(r.length,t.length-r.length),[t,a]};c.prototype.patch_addPadding=function(e){for(var t=this.Patch_Margin,r="",i=1;i<=t;i++)r+=String.fromCharCode(i);for(var i=0;i<e.length;i++)e[i].start1+=t,e[i].start2+=t;var a=e[0],n=a.diffs;if(n.length==0||n[0][0]!=d)n.unshift(new c.Diff(d,r)),a.start1-=t,a.start2-=t,a.length1+=t,a.length2+=t;else if(t>n[0][1].length){var s=t-n[0][1].length;n[0][1]=r.substring(n[0][1].length)+n[0][1],a.start1-=s,a.start2-=s,a.length1+=s,a.length2+=s}if(a=e[e.length-1],n=a.diffs,n.length==0||n[n.length-1][0]!=d)n.push(new c.Diff(d,r)),a.length1+=t,a.length2+=t;else if(t>n[n.length-1][1].length){var s=t-n[n.length-1][1].length;n[n.length-1][1]+=r.substring(0,s),a.length1+=s,a.length2+=s}return r};c.prototype.patch_splitMax=function(e){for(var t=this.Match_MaxBits,r=0;r<e.length;r++)if(!(e[r].length1<=t)){var i=e[r];e.splice(r--,1);for(var a=i.start1,n=i.start2,s="";i.diffs.length!==0;){var o=new c.patch_obj,l=!0;for(o.start1=a-s.length,o.start2=n-s.length,s!==""&&(o.length1=o.length2=s.length,o.diffs.push(new c.Diff(d,s)));i.diffs.length!==0&&o.length1<t-this.Patch_Margin;){var f=i.diffs[0][0],h=i.diffs[0][1];f===w?(o.length2+=h.length,n+=h.length,o.diffs.push(i.diffs.shift()),l=!1):f===_&&o.diffs.length==1&&o.diffs[0][0]==d&&h.length>2*t?(o.length1+=h.length,a+=h.length,l=!1,o.diffs.push(new c.Diff(f,h)),i.diffs.shift()):(h=h.substring(0,t-o.length1-this.Patch_Margin),o.length1+=h.length,a+=h.length,f===d?(o.length2+=h.length,n+=h.length):l=!1,o.diffs.push(new c.Diff(f,h)),h==i.diffs[0][1]?i.diffs.shift():i.diffs[0][1]=i.diffs[0][1].substring(h.length))}s=this.diff_text2(o.diffs),s=s.substring(s.length-this.Patch_Margin);var u=this.diff_text1(i.diffs).substring(0,this.Patch_Margin);u!==""&&(o.length1+=u.length,o.length2+=u.length,o.diffs.length!==0&&o.diffs[o.diffs.length-1][0]===d?o.diffs[o.diffs.length-1][1]+=u:o.diffs.push(new c.Diff(d,u))),l||e.splice(++r,0,o)}}};c.prototype.patch_toText=function(e){for(var t=[],r=0;r<e.length;r++)t[r]=e[r];return t.join("")};c.prototype.patch_fromText=function(e){var t=[];if(!e)return t;for(var r=e.split(`
`),i=0,a=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;i<r.length;){var n=r[i].match(a);if(!n)throw new Error("Invalid patch string: "+r[i]);var s=new c.patch_obj;for(t.push(s),s.start1=parseInt(n[1],10),n[2]===""?(s.start1--,s.length1=1):n[2]=="0"?s.length1=0:(s.start1--,s.length1=parseInt(n[2],10)),s.start2=parseInt(n[3],10),n[4]===""?(s.start2--,s.length2=1):n[4]=="0"?s.length2=0:(s.start2--,s.length2=parseInt(n[4],10)),i++;i<r.length;){var o=r[i].charAt(0);try{var l=decodeURI(r[i].substring(1))}catch{throw new Error("Illegal escape in patch_fromText: "+l)}if(o=="-")s.diffs.push(new c.Diff(_,l));else if(o=="+")s.diffs.push(new c.Diff(w,l));else if(o==" ")s.diffs.push(new c.Diff(d,l));else{if(o=="@")break;if(o!=="")throw new Error('Invalid patch mode "'+o+'" in: '+l)}i++}}return t};c.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0};c.patch_obj.prototype.toString=function(){var e,t;this.length1===0?e=this.start1+",0":this.length1==1?e=this.start1+1:e=this.start1+1+","+this.length1,this.length2===0?t=this.start2+",0":this.length2==1?t=this.start2+1:t=this.start2+1+","+this.length2;for(var r=["@@ -"+e+" +"+t+` @@
`],i,a=0;a<this.diffs.length;a++){switch(this.diffs[a][0]){case w:i="+";break;case _:i="-";break;case d:i=" ";break}r[a+1]=i+encodeURI(this.diffs[a][1])+`
`}return r.join("").replace(/%20/g," ")};te.exports=c;te.exports.diff_match_patch=c;te.exports.DIFF_DELETE=_;te.exports.DIFF_INSERT=w;te.exports.DIFF_EQUAL=d});function ut(e,...t){let r=[],{length:i}=e;for(let n=0;n<i;n++)r.push(e[n],t[n]);r.pop();let a=r.join("");return a=a.replaceAll(/\/\*[\s\S]*?\*\//g,""),a=a.replaceAll(/\s\/\/.*/g,""),a}var j=ut;var B="gameDirHandle",ne="mirrorDirHandle",M="log-host",oe="is-disabled",P="status-ok",$="status-warning",H="status-progress",W="btn-game",le="btn-mirror",Z="btn-retrieve",Q="btn-preview",X="btn-save",L="diff-list",G="diff-path",ce="diff-label",ie="diff-new",q="diff-identical",Y="diff-changed",K="diff-content",x="diff-collapsed";var gt=j`
    /* ================== GENERAL ================== */

    #setup.${oe} {
        pointer-events: none;
    }

    #setup button {
        padding: 4px 6px;
        cursor: pointer;
        font-size: inherit;
    }

    #setup button progress {
        display: none;
    }

    /* ================== STATUSES ================== */

    #setup .${P}:after {
        content: ' ✅';
    }

    #setup .${$}:after {
        content: ' ⚠️';
    }

    #setup .${H} progress {
        display: inline-block;
    }

    /* ================== LOG ================== */

    #setup .log-title {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup .${M} {
        overflow-y: scroll;
        height: 200px;
        flex-shrink: 0;
    }

    #setup .${L} textarea {
        font-family: "JetBrains Mono", monospace;
    }

    #setup .${M} table {
        width: 100%;
        border-collapse: collapse;
        margin: 0;
    }

    #setup .${M} th {
        text-align: left;
    }

    #setup .${M} th,
    #setup .${M} td {
        border: solid 1px rgba(255, 255, 255, 0.1);
        border-left: none;
        border-right: none;
        vertical-align: top;
        padding: 4px;
    }

    #setup .${M} th {
        border-top: none;
    }

    #setup .${M} table {
        border: solid 1px rgba(255, 255, 255, 0.1);
    }

    #setup .${M} th {
        background: rgba(255, 255, 255, 0.1);
    }

    #setup .${M} td:nth-child(1) {
        width: 90px;
    }

    #setup .${M} td:nth-child(2),
    #setup .${M} th:nth-child(2) {
        width: 20px;
        text-align: center;
    }

    #setup .${M} td > div > div {
        cursor: pointer;
        color: yellow;
    }

    #setup .${M} textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`,fe=gt;var pt=j`
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

    ${fe}
`,Re=pt;var dt=`
<style>${Re}</style>
<div class='steps'>
    <!-- ==== SELECT =================================== -->
    <div class='step'>
        <div class='title'>1. Select game data directory</div>
        <div class='about'>
            Give read-access to the local install directory of the game so the parser can choose what files it needs.
        </div>
        <div class='action'>
            Action: <button class='${W}'>Pick directory</button> 
        </div>
    </div>
    <!-- ==== RETRIEVE =================================== -->
    <div class='step'>
        <div class='title'>2. Retrieve wiki data pages</div>
        <div class='about'>
            Temporarily download all relevant data pages from this wiki so they can be used as a comparison base. <br/>
            This step is optional, but recommended, because it gives awareness in the following steps and
            reduces the number of updates needed.</i>
        </div>
        <div class='action'>
            Action: <button class='${Z}'>Retrieve <progress/></button> 
        </div>
    </div>
    <!-- ==== PREVIEW =================================== -->
    <div class='step'>
        <div class='title'>3. Preview changes</div>
        <div class='about'>
            Open a popup window listing each page that is about to be updated, potentially highlighting differences.
        </div>
        <div class='action'>
            Action: <button class='${Q}'>Preview <progress/></button> 
        </div>
    </div>
    <!-- ==== SAVE =================================== -->
    <div class='step'>
        <div class='title'>4. Save changes</div>
        <div class='about'>
            Write the changes to each page using the current account, just as if you had done them manually.
        </div>
        <div class='action'>
            Action: <button class='${X}'>SAVE <progress/></button> 
        </div>
    </div>
</div>
<!-- ==== LOG =================================== -->
<div class='log-title'>Log:</div>
<div class='${M}'>
    <table class='wikitable'>
        <tr>
            <th>Timestamp</th>
            <th>\u{1F197}</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`,Fe=dt;var he,Pe,vt={info:"\u2139\uFE0F",warning:"\u26A0\uFE0F",error:"\u26D4"};function mt(e,...t){let r=e.endsWith("!")?e.startsWith("!")?"error":"warning":"info";bt(r,e,t)}function Le(e){he=e,Pe=he.querySelector("table")}function bt(e,t,r){let a=new Date().toLocaleTimeString("en-GB",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3}),n=document.createElement("tr");ve(n,a),ve(n,vt[e]),ve(n,_t(t,r)),Pe.appendChild(n),he.scrollTo({top:he.scrollHeight,behavior:"smooth"})}function ve(e,t){let r=document.createElement("td");t=t instanceof Node?t:document.createTextNode(t),r.appendChild(t),e.appendChild(r)}function _t(e,t){if(e=e.replace(/^!/,""),console.log(e,...t),!t.length)return document.createTextNode(e);let r=document.createElement("div"),i=document.createElement("div");i.innerHTML=e,i.onclick=function(){let n=this.nextElementSibling.style.display!=="none";this.nextElementSibling.style.display=n?"none":"block"},r.appendChild(i);let a=document.createElement("textarea");return a.style.display="none",a.innerHTML=wt(t),r.appendChild(a),r}function wt(e){let t=[];for(let r of e)typeof r=="object"&&r?r instanceof Error?t.push(r.stack):t.push(JSON.stringify(r,null,4)):t.push(r);return t.join(`
`)}var D=mt;var Dt=j`
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        font-size: 13px;
        font-family: "JetBrains Mono", monospace;
    }

    .${L} pre {
        font-family: "JetBrains Mono", monospace;
    }

    .${G} {
        font-weight: bold;
        background: silver;
        padding: 8px;
        cursor: pointer;
    }

    .${ce} {
        float: right;
        border: solid 1px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        padding: 4px;
        margin-right: -5px;
        margin-top: -5px;
    }

    .${G}.${ie} {
        background: rgba(0, 0, 255, 0.2);
        border-top: solid 1px rgba(0, 0, 255, 0.4);
    }

    .${G}.${q} {
        background: rgba(0, 255, 0, 0.2);
        border-top: solid 1px rgba(0, 255, 0, 0.4);
    }

    .${G}.${Y} {
        background: rgba(255, 100, 0, 0.2);
        border-top: solid 1px rgba(255, 100, 0, 0.4);
    }

    .${K} {
        display: flex;
        flex-direction: row;
    }

    .${K}.${x} {
        display: none;
    }

    .${K} pre {
        margin: 0;
        flex: 1;
        min-width: 0;
        padding: 8px;
    }

    .${K} pre:nth-child(2) {
        border-left: solid 2px rgba(255, 100, 0, 0.2);
    }

    del {
        background: #f5a7a7;
        text-decoration: none;
        outline: solid 1px #f5a7a7;
    }

    ins {
        background: #BEE6BE;
        text-decoration: none;
        outline: solid 1px #BEE6BE;
    }
`,ue=Dt;var St=j`
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        font-size: 13px;
        background: #1e242c;
        color: #fff;
        font-family: "JetBrains Mono", monospace;
    }

    #setup {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .bar {
        padding: 8px;
    }

    .${L} {
        background: #fff;
        color: #000;
        flex-grow: 1;
        overflow-y: scroll;
    }

    ${fe}
    ${ue}
`,Ne=St;var Et=`
<style>${Ne}</style>
<div class='bar'>
    <button class='${W}'>Pick game directory</button>
    <button class='${le}'>Pick mirror directory</button> 
</div>
<div class='${L}'>
</div>
<div class='${M}'>
    <table class='wikitable'>
        <tr>
            <th>Timestamp</th>
            <th>\u{1F197}</th>
            <th>Message</th>
        </tr>
    </table>
</div>  
`,$e=Et;var Ce=window.location.host||"localhost",ee="store";async function F(e){if(!(await indexedDB.databases()).find(i=>i.name===Ce))return;let r=await Be();if(!r.objectStoreNames.contains(ee)){r.close();return}return new Promise((i,a)=>{let n=r.transaction(ee).objectStore(ee).get(e);n.onsuccess=()=>{i(n.result),r.close()},n.onerror=()=>{a(n.error),r.close()}})}async function Oe(e,t){let r=await Be();return new Promise((i,a)=>{let n=r.transaction(ee,"readwrite");n.objectStore(ee).put(t,e),n.oncomplete=()=>{i(),r.close()},n.onerror=()=>{a(n.error),r.close()}})}function Be(){return new Promise((e,t)=>{let r=indexedDB.open(Ce);r.onupgradeneeded=i=>i.target.result.createObjectStore(ee),r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}async function yt(e,t,r){return new Promise(i=>{let a=n=>{let s=n.data&&typeof n.data=="object"?n.data:{};s.type===t&&(e.removeEventListener("message",a),i(s.payload))};e.addEventListener("message",a),e.postMessage({type:t,payload:r})})}var me=yt;function At(e,t,r){e.postMessage({type:t,payload:r})}var He=At;async function Tt(e,t,r,i){return Ge(e,"",t,r,i)}async function Ge(e,t,r,i,a){t+=t?"/":"";let n={},s=await Mt(e);for(let[o,l]of s){let f=t+o;if(!(i&&f.match(i))){if(l.kind==="directory"){let h=await Ge(l,f,r,i,a);if(h instanceof File)return h;Object.assign(n,h)}else if(f.match(r)){let h=await l.getFile();if(a)return h;n[f]=h}}}return n}async function Mt(e){let t=[];try{for await(let r of e.entries())t.push(r)}catch{}return t}var Ue=Tt;async function It(e){return await e?.queryPermission()==="granted"}var N=It;function kt(e){return document.querySelector("."+e)}var U=kt;function Rt(e,t,r){let i;typeof t=="string"?(t.match(/^[a-z]/)&&(t="."+t),i=Array.from(document.querySelectorAll(t))):Array.isArray(t)?i=t:i=[t];for(let a of i)a.addEventListener(e,r)}var C=Rt;async function Ft(e){let t=await F(e);if(t&&!await N(t)){if(await t.requestPermission(),await N(t))return t}try{t=await window.showDirectoryPicker({mode:"read"})}catch{}return t&&await Oe(e,t),t}var ae=Ft;var ge=ht(je(),1),Pt=new ge.default;function Lt(e,t){let r=We(e),i=We(t),a=Pt.diff_main(r,i),n=[],s=[];for(let[h,u]of a)switch(h){case ge.default.DIFF_DELETE:n.push("<del>"+u+"</del>"),s.push("<del></del>");break;case ge.default.DIFF_INSERT:n.push("<ins></ins>"),s.push("<ins>"+u+"</ins>");break;default:n.push(u),s.push(u)}let o=n.join("").replaceAll("</del><ins></ins>","</del>"),l=s.join("").replaceAll("<del></del><ins>","<ins>"),f=l.split("<").length-1;return{text1:o,text2:l,differences:f/2}}function We(e){return e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")}var Ve=Lt;var Nt={[ie]:"new",[q]:"identical",[Y]:"changed"};function $t(e,t,r){let i=[];for(let a in t){let n=t[a],s=e[a];if(s!==void 0){let{text1:l,text2:f}=Ve(s,n);s=l,n=f}else n=Ot(n);let o=Ct(a,s,n);i.push(...o)}r.innerHTML=i.join(""),C("click","."+G,Bt),Ht(r)}function Ct(e,t,r){let i=t===void 0?ie:t===r?q:Y,a=`<div class="${ce}">${Nt[i]}</div>`,n=i===q?x:"",s=[];return s.push(`<div class="${G} ${i}">${a}${e}</div>`),s.push(`<div class="${K} ${n}">`),i===Y&&s.push(`<pre>${t}</pre>`),s.push(`<pre>${r}</pre>`),s.push("</div>"),s}function Ot(e){return e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")}function Bt(e){e.currentTarget.nextElementSibling.classList.toggle(x)}function Ht(e){let t=e.querySelectorAll("."+G);for(let r of t)if(!r.nextElementSibling.classList.contains(x)){r.scrollIntoView({behavior:"smooth",block:"start"});break}}var pe=$t;var Gt=new RegExp("[ :]");function Ut(e){if(e.match(Gt)){D("Path contains an illegal character!",e);return}if(e.match("/.*?/")){D("Path contains too many slashes!",e);return}let t=e;return t=t.replace(/^Main\//,""),t=t.replace("/",":"),t=t.replaceAll("~","/"),t=t.replaceAll("_"," "),t=t.replaceAll("#",":"),t=t.replace(/\.lua$/,""),t=t.replace(/\.wiki$/,""),t}var de=Ut;var jt=new Set(["Main","Data","Media","Special","Talk","User","User talk","Project","Project talk","File","File talk","MediaWiki","MediaWiki talk","Template","Template talk","Help","Help talk","Category","Category talk","Module","Module talk"]),Wt=new Set(["css"]),Vt=new RegExp("~");function zt(e){e.match(Vt)&&D("Title contains an illegal character!",e);let{namespace:t,titleWithoutNamespace:r}=Kt(e),i=r;return i=i.replaceAll("/","~"),i=i.replaceAll(" ","_"),i=i.replaceAll(":","#"),i=Jt(i),i=Zt(i,t),t.replace(" ","_")+"/"+i}function Kt(e){let[,t,r]=e.match(/(.*?):(.*)/)||[null,"",e];return jt.has(t)||(t="",r=e),t=t||"Main",{namespace:t,titleWithoutNamespace:r}}function Jt(e){let t=(e.match(/\.([a-zA-Z]+)$/)||[null,""])[1].toLowerCase();return t==="url"?e.replace(/\.url$/,""):Wt.has(t)?e:e+".wiki"}function Zt(e,t){return t!=="Module"||e.endsWith("~doc.wiki")||e.endsWith(".css")?e:e.replace(".wiki",".lua")}var ze=zt;async function Qt(e){return e.then(t=>[t,null]).catch(t=>[null,t])}var be=Qt;var _e;async function se(e){if(!_e){console.log("Please call applySettings() prior to asking!");return}let t={method:Xt(e)},r=new URL(_e.API_URL),i=qt(e);t.method==="GET"?r.search=i.toString():t.body=i;let[a,n]=await be(fetch(r,t));if(!a){D("Failed to fetch!",n);return}let[s,o]=await be(a.json());if(!s){D("Invalid json!",o);return}return s}function Ke(e){let{API_URL:t}=e;_e={API_URL:t}}function Xt(e){return!e.method||e.method==="GET"?"GET":"POST"}function qt(e){let t={...e,format:"json",formatversion:2},{method:r}=t;if(delete t.method,r==="FORM"){let i=new FormData;for(let a in t){let n=t[a];Array.isArray(n)?i.append(a,n[0],n[1]):i.append(a,n)}return i}return new URLSearchParams(t)}var Je=50;async function Yt(e){let t=Object.keys(e).map(a=>de(a)),r=await xt(t);if(!r)return;let i={};for(let a in r){let n=ze(a);n&&(r[a]===void 0?D("Invalid page content!",a):i[n]=r[a])}return D(`Retrieved ${Object.keys(i).length} pages.`),i}async function xt(e){let t={};for(let r=0;r<e.length;r+=Je){let i=Math.min(r+Je,e.length),a=e.slice(r,i);D(`Retrieving ${r+1}-${i} of ${e.length} pages (${a[0]})...`);let n=await se({action:"query",prop:"revisions",rvprop:"content",rvslots:"main",titles:a.join("|"),origin:"*"});if(!n)continue;let s=n.query?.pages||[];for(let o of s)o.missing||(t[o.title]=o.revisions?.[0]?.slots?.main?.content)}return t}var Ze=Yt;function er(e,t){e.classList.toggle(P,t===P),e.classList.toggle($,t===$),e.classList.toggle(H,t===H)}var V=er;async function tr(e,t){let r=rr(e,t);if(!r.length)return D("All pages are already updated."),!0;let i=await nr();if(!i)return D("Cannot get csrf token!"),!1;let a=0;for(let{title:n,content:s}of r)await ir(n,s,i)&&a++;return D(`Successfully saved ${a} pages.`),!0}async function rr(e,t){let r=[];t=t||{};for(let i in e){let a=e[i],n=t[i];if(a!==n){let s=de(i);r.push({title:s,content:a})}}return r}async function nr(){return(await se({action:"query",meta:"tokens"}))?.query?.tokens?.csrftoken}async function ir(e,t,r){return D(`Saving content for "${e}"...`),(await se({method:"POST",action:"edit",title:e,text:t,token:r}))?.edit?.result!=="Success"?(D("Save failed!",e,t),!1):!0}var Qe=tr;function ar(){return document.location.href.replace(/[^\/]*$/,"")+"api.php"}var Xe=ar;var qe,Ye,we,De,Se,Ee,J={parserResult:null,mirrorResult:null,progressingButton:null,hasDirAccess:!1,hasPreviewed:!1,hasSaved:!1};async function sr(e,t){qe=e,Ye=t,we=U(W),De=U(Z),Se=U(Q),Ee=U(X),C("click",we,lr),C("click",De,cr),C("click",Se,fr),C("click",Ee,hr);let r=await F(B);z({hasDirAccess:await N(r)}),Ke({API_URL:Xe()})}function z(e){Object.assign(J,e),or()}function or(){let{hasDirAccess:e,progressingButton:t,mirrorResult:r,hasPreviewed:i,hasSaved:a}=J;qe.classList.toggle(oe,!!t),V(we,e?P:$);let n;t===Z?n=H:n=r?P:null,V(De,n);let s;t===Q?s=H:s=i?P:null,V(Se,s);let o;t===X?o=H:o=a?P:null,V(Ee,o)}async function lr(){let e=await F(B);await ae(B);let t=await F(B);await e.isSameEntry(t)?z({hasDirAccess:await N(t)}):z({parserResult:null,mirrorResult:null,progressingButton:null,hasDirAccess:await N(t),hasPreviewed:!1,hasSaved:!1})}async function cr(){await ye(Z),z({mirrorResult:await Ze(J.parserResult)})}async function fr(){await ye(Q);let e=window.open("","Preview");if(!e)return;let t=e.document;t.open(),t.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Preview</title>
            <style>${ue}</style>
        </head>
        <body>
            <div class='${L}'></div>
        </body>
        </html>
    `),t.close();let{mirrorResult:r,parserResult:i}=J;pe(r||{},i,t.querySelector("."+L)),z({hasPreviewed:!0})}async function hr(){await ye(X);let e=await Qe(J.parserResult,J.mirrorResult);z({hasSaved:e})}async function ye(e){if(!J.parserResult){z({isWorking:!0,progressingButton:e});let t=await Ye();z({parserResult:t,isWorking:!0,progressingButton:null})}}var xe=sr;async function ur(e,t){let r=t.split("/"),i=r.pop(),a=e;for(let s of r)try{a=await a.getDirectoryHandle(s)}catch{return}let n;try{n=await a.getFileHandle(i)}catch{return}try{return await n.getFile()}catch{}}var et=ur;var tt,Ae,Te,Me={hasGameAccess:!1,hasMirrorAccess:!1};async function gr(e,t){tt=t,Ae=U(W),Te=U(le),C("click",Ae,vr),C("click",Te,mr),await Ie()}function pr(e){Object.assign(Me,e),dr()}function dr(){let{hasGameAccess:e,hasMirrorAccess:t}=Me;V(Ae,e?P:$),V(Te,t?P:$)}async function vr(){let e=await F(B),t=await ae(B);await e.isSameEntry(t)||await Ie()}async function mr(){let e=await F(ne),t=await ae(ne);await e.isSameEntry(t)||await Ie()}async function Ie(){let e=await F(B),t=await F(ne);if(pr({hasGameAccess:N(e),hasMirrorAccess:N(t)}),!Me.hasGameAccess)return;let r=await tt(),i=await br(r);pe(i,r,U(L))}async function br(e){let t={},r=await F(ne);if(!await N(r))return t;for(let i in e){let a=await et(r,i);t[i]=a?await a.text():void 0}return t}var rt=gr;var _r="gameDirHandle",re;async function wr(){let e=document.getElementById("setup");if(!e)return;let t=e.dataset.dev==="1",r=e.dataset.parse;e.innerHTML=t?$e:Fe,Le(e.querySelector("."+M)),D("Initialized."),await Dr(r),t?await rt(e,nt):await xe(e,nt)}async function Dr(e){re=new Worker(`data:application/javascript,importScripts('${e}');`),re.addEventListener("error",()=>D("!Parser error!")),await me(re,"ready"),D("Connected to parser."),re.addEventListener("message",Sr)}async function Sr(e){let t=e.data&&typeof e.data=="object"?e.data:{},{type:r,payload:i}=t;switch(r){case"find":{let a=await F(_r),[n,s,o]=i,l=await Ue(a,n,s,o);He(re,"find",l);break}case"log":{D(...i);break}}}async function nt(){D("Started parsing...");let e=await me(re,"run");return D(`Received ${Object.keys(e).length} parsing results.`),e}wr();})();
