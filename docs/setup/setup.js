(()=>{var st=Object.create;var Fe=Object.defineProperty;var at=Object.getOwnPropertyDescriptor;var ot=Object.getOwnPropertyNames;var lt=Object.getPrototypeOf,ct=Object.prototype.hasOwnProperty;var ft=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(r){throw t=0,r}};var ht=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ot(t))!ct.call(e,s)&&s!==r&&Fe(e,s,{get:()=>t[s],enumerable:!(n=at(t,s))||n.enumerable});return e};var ut=(e,t,r)=>(r=e!=null?st(lt(e)):{},ht(t||!e||!e.__esModule?Fe(r,"default",{value:e,enumerable:!0}):r,e));var We=ft((tn,re)=>{var c=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},_=-1,w=1,d=0;c.Diff=function(e,t){return[e,t]};c.prototype.diff_main=function(e,t,r,n){typeof n>"u"&&(this.Diff_Timeout<=0?n=Number.MAX_VALUE:n=new Date().getTime()+this.Diff_Timeout*1e3);var s=n;if(e==null||t==null)throw new Error("Null input. (diff_main)");if(e==t)return e?[new c.Diff(d,e)]:[];typeof r>"u"&&(r=!0);var i=r,a=this.diff_commonPrefix(e,t),o=e.substring(0,a);e=e.substring(a),t=t.substring(a),a=this.diff_commonSuffix(e,t);var l=e.substring(e.length-a);e=e.substring(0,e.length-a),t=t.substring(0,t.length-a);var f=this.diff_compute_(e,t,i,s);return o&&f.unshift(new c.Diff(d,o)),l&&f.push(new c.Diff(d,l)),this.diff_cleanupMerge(f),f};c.prototype.diff_compute_=function(e,t,r,n){var s;if(!e)return[new c.Diff(w,t)];if(!t)return[new c.Diff(_,e)];var i=e.length>t.length?e:t,a=e.length>t.length?t:e,o=i.indexOf(a);if(o!=-1)return s=[new c.Diff(w,i.substring(0,o)),new c.Diff(d,a),new c.Diff(w,i.substring(o+a.length))],e.length>t.length&&(s[0][0]=s[2][0]=_),s;if(a.length==1)return[new c.Diff(_,e),new c.Diff(w,t)];var l=this.diff_halfMatch_(e,t);if(l){var f=l[0],h=l[1],u=l[2],g=l[3],p=l[4],v=this.diff_main(f,u,r,n),b=this.diff_main(h,g,r,n);return v.concat([new c.Diff(d,p)],b)}return r&&e.length>100&&t.length>100?this.diff_lineMode_(e,t,n):this.diff_bisect_(e,t,n)};c.prototype.diff_lineMode_=function(e,t,r){var n=this.diff_linesToChars_(e,t);e=n.chars1,t=n.chars2;var s=n.lineArray,i=this.diff_main(e,t,!1,r);this.diff_charsToLines_(i,s),this.diff_cleanupSemantic(i),i.push(new c.Diff(d,""));for(var a=0,o=0,l=0,f="",h="";a<i.length;){switch(i[a][0]){case w:l++,h+=i[a][1];break;case _:o++,f+=i[a][1];break;case d:if(o>=1&&l>=1){i.splice(a-o-l,o+l),a=a-o-l;for(var u=this.diff_main(f,h,!1,r),g=u.length-1;g>=0;g--)i.splice(a,0,u[g]);a=a+u.length}l=0,o=0,f="",h="";break}a++}return i.pop(),i};c.prototype.diff_bisect_=function(e,t,r){for(var n=e.length,s=t.length,i=Math.ceil((n+s)/2),a=i,o=2*i,l=new Array(o),f=new Array(o),h=0;h<o;h++)l[h]=-1,f[h]=-1;l[a+1]=0,f[a+1]=0;for(var u=n-s,g=u%2!=0,p=0,v=0,b=0,A=0,m=0;m<i&&!(new Date().getTime()>r);m++){for(var D=-m+p;D<=m-v;D+=2){var y=a+D,E;D==-m||D!=m&&l[y-1]<l[y+1]?E=l[y+1]:E=l[y-1]+1;for(var k=E-D;E<n&&k<s&&e.charAt(E)==t.charAt(k);)E++,k++;if(l[y]=E,E>n)v+=2;else if(k>s)p+=2;else if(g){var I=a+u-D;if(I>=0&&I<o&&f[I]!=-1){var T=n-f[I];if(E>=T)return this.diff_bisectSplit_(e,t,E,k,r)}}}for(var R=-m+b;R<=m-A;R+=2){var I=a+R,T;R==-m||R!=m&&f[I-1]<f[I+1]?T=f[I+1]:T=f[I-1]+1;for(var O=T-R;T<n&&O<s&&e.charAt(n-T-1)==t.charAt(s-O-1);)T++,O++;if(f[I]=T,T>n)A+=2;else if(O>s)b+=2;else if(!g){var y=a+u-R;if(y>=0&&y<o&&l[y]!=-1){var E=l[y],k=a+E-y;if(T=n-T,E>=T)return this.diff_bisectSplit_(e,t,E,k,r)}}}}return[new c.Diff(_,e),new c.Diff(w,t)]};c.prototype.diff_bisectSplit_=function(e,t,r,n,s){var i=e.substring(0,r),a=t.substring(0,n),o=e.substring(r),l=t.substring(n),f=this.diff_main(i,a,!1,s),h=this.diff_main(o,l,!1,s);return f.concat(h)};c.prototype.diff_linesToChars_=function(e,t){var r=[],n={};r[0]="";function s(l){for(var f="",h=0,u=-1,g=r.length;u<l.length-1;){u=l.indexOf(`
`,h),u==-1&&(u=l.length-1);var p=l.substring(h,u+1);(n.hasOwnProperty?n.hasOwnProperty(p):n[p]!==void 0)?f+=String.fromCharCode(n[p]):(g==i&&(p=l.substring(h),u=l.length),f+=String.fromCharCode(g),n[p]=g,r[g++]=p),h=u+1}return f}var i=4e4,a=s(e);i=65535;var o=s(t);return{chars1:a,chars2:o,lineArray:r}};c.prototype.diff_charsToLines_=function(e,t){for(var r=0;r<e.length;r++){for(var n=e[r][1],s=[],i=0;i<n.length;i++)s[i]=t[n.charCodeAt(i)];e[r][1]=s.join("")}};c.prototype.diff_commonPrefix=function(e,t){if(!e||!t||e.charAt(0)!=t.charAt(0))return 0;for(var r=0,n=Math.min(e.length,t.length),s=n,i=0;r<s;)e.substring(i,s)==t.substring(i,s)?(r=s,i=r):n=s,s=Math.floor((n-r)/2+r);return s};c.prototype.diff_commonSuffix=function(e,t){if(!e||!t||e.charAt(e.length-1)!=t.charAt(t.length-1))return 0;for(var r=0,n=Math.min(e.length,t.length),s=n,i=0;r<s;)e.substring(e.length-s,e.length-i)==t.substring(t.length-s,t.length-i)?(r=s,i=r):n=s,s=Math.floor((n-r)/2+r);return s};c.prototype.diff_commonOverlap_=function(e,t){var r=e.length,n=t.length;if(r==0||n==0)return 0;r>n?e=e.substring(r-n):r<n&&(t=t.substring(0,r));var s=Math.min(r,n);if(e==t)return s;for(var i=0,a=1;;){var o=e.substring(s-a),l=t.indexOf(o);if(l==-1)return i;a+=l,(l==0||e.substring(s-a)==t.substring(0,a))&&(i=a,a++)}};c.prototype.diff_halfMatch_=function(e,t){if(this.Diff_Timeout<=0)return null;var r=e.length>t.length?e:t,n=e.length>t.length?t:e;if(r.length<4||n.length*2<r.length)return null;var s=this;function i(v,b,A){for(var m=v.substring(A,A+Math.floor(v.length/4)),D=-1,y="",E,k,I,T;(D=b.indexOf(m,D+1))!=-1;){var R=s.diff_commonPrefix(v.substring(A),b.substring(D)),O=s.diff_commonSuffix(v.substring(0,A),b.substring(0,D));y.length<O+R&&(y=b.substring(D-O,D)+b.substring(D,D+R),E=v.substring(0,A-O),k=v.substring(A+R),I=b.substring(0,D-O),T=b.substring(D+R))}return y.length*2>=v.length?[E,k,I,T,y]:null}var a=i(r,n,Math.ceil(r.length/4)),o=i(r,n,Math.ceil(r.length/2)),l;if(!a&&!o)return null;o?a?l=a[4].length>o[4].length?a:o:l=o:l=a;var f,h,u,g;e.length>t.length?(f=l[0],h=l[1],u=l[2],g=l[3]):(u=l[0],g=l[1],f=l[2],h=l[3]);var p=l[4];return[f,h,u,g,p]};c.prototype.diff_cleanupSemantic=function(e){for(var t=!1,r=[],n=0,s=null,i=0,a=0,o=0,l=0,f=0;i<e.length;)e[i][0]==d?(r[n++]=i,a=l,o=f,l=0,f=0,s=e[i][1]):(e[i][0]==w?l+=e[i][1].length:f+=e[i][1].length,s&&s.length<=Math.max(a,o)&&s.length<=Math.max(l,f)&&(e.splice(r[n-1],0,new c.Diff(_,s)),e[r[n-1]+1][0]=w,n--,n--,i=n>0?r[n-1]:-1,a=0,o=0,l=0,f=0,s=null,t=!0)),i++;for(t&&this.diff_cleanupMerge(e),this.diff_cleanupSemanticLossless(e),i=1;i<e.length;){if(e[i-1][0]==_&&e[i][0]==w){var h=e[i-1][1],u=e[i][1],g=this.diff_commonOverlap_(h,u),p=this.diff_commonOverlap_(u,h);g>=p?(g>=h.length/2||g>=u.length/2)&&(e.splice(i,0,new c.Diff(d,u.substring(0,g))),e[i-1][1]=h.substring(0,h.length-g),e[i+1][1]=u.substring(g),i++):(p>=h.length/2||p>=u.length/2)&&(e.splice(i,0,new c.Diff(d,h.substring(0,p))),e[i-1][0]=w,e[i-1][1]=u.substring(0,u.length-p),e[i+1][0]=_,e[i+1][1]=h.substring(p),i++),i++}i++}};c.prototype.diff_cleanupSemanticLossless=function(e){function t(p,v){if(!p||!v)return 6;var b=p.charAt(p.length-1),A=v.charAt(0),m=b.match(c.nonAlphaNumericRegex_),D=A.match(c.nonAlphaNumericRegex_),y=m&&b.match(c.whitespaceRegex_),E=D&&A.match(c.whitespaceRegex_),k=y&&b.match(c.linebreakRegex_),I=E&&A.match(c.linebreakRegex_),T=k&&p.match(c.blanklineEndRegex_),R=I&&v.match(c.blanklineStartRegex_);return T||R?5:k||I?4:m&&!y&&E?3:y||E?2:m||D?1:0}for(var r=1;r<e.length-1;){if(e[r-1][0]==d&&e[r+1][0]==d){var n=e[r-1][1],s=e[r][1],i=e[r+1][1],a=this.diff_commonSuffix(n,s);if(a){var o=s.substring(s.length-a);n=n.substring(0,n.length-a),s=o+s.substring(0,s.length-a),i=o+i}for(var l=n,f=s,h=i,u=t(n,s)+t(s,i);s.charAt(0)===i.charAt(0);){n+=s.charAt(0),s=s.substring(1)+i.charAt(0),i=i.substring(1);var g=t(n,s)+t(s,i);g>=u&&(u=g,l=n,f=s,h=i)}e[r-1][1]!=l&&(l?e[r-1][1]=l:(e.splice(r-1,1),r--),e[r][1]=f,h?e[r+1][1]=h:(e.splice(r+1,1),r--))}r++}};c.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;c.whitespaceRegex_=/\s/;c.linebreakRegex_=/[\r\n]/;c.blanklineEndRegex_=/\n\r?\n$/;c.blanklineStartRegex_=/^\r?\n\r?\n/;c.prototype.diff_cleanupEfficiency=function(e){for(var t=!1,r=[],n=0,s=null,i=0,a=!1,o=!1,l=!1,f=!1;i<e.length;)e[i][0]==d?(e[i][1].length<this.Diff_EditCost&&(l||f)?(r[n++]=i,a=l,o=f,s=e[i][1]):(n=0,s=null),l=f=!1):(e[i][0]==_?f=!0:l=!0,s&&(a&&o&&l&&f||s.length<this.Diff_EditCost/2&&a+o+l+f==3)&&(e.splice(r[n-1],0,new c.Diff(_,s)),e[r[n-1]+1][0]=w,n--,s=null,a&&o?(l=f=!0,n=0):(n--,i=n>0?r[n-1]:-1,l=f=!1),t=!0)),i++;t&&this.diff_cleanupMerge(e)};c.prototype.diff_cleanupMerge=function(e){e.push(new c.Diff(d,""));for(var t=0,r=0,n=0,s="",i="",a;t<e.length;)switch(e[t][0]){case w:n++,i+=e[t][1],t++;break;case _:r++,s+=e[t][1],t++;break;case d:r+n>1?(r!==0&&n!==0&&(a=this.diff_commonPrefix(i,s),a!==0&&(t-r-n>0&&e[t-r-n-1][0]==d?e[t-r-n-1][1]+=i.substring(0,a):(e.splice(0,0,new c.Diff(d,i.substring(0,a))),t++),i=i.substring(a),s=s.substring(a)),a=this.diff_commonSuffix(i,s),a!==0&&(e[t][1]=i.substring(i.length-a)+e[t][1],i=i.substring(0,i.length-a),s=s.substring(0,s.length-a))),t-=r+n,e.splice(t,r+n),s.length&&(e.splice(t,0,new c.Diff(_,s)),t++),i.length&&(e.splice(t,0,new c.Diff(w,i)),t++),t++):t!==0&&e[t-1][0]==d?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++,n=0,r=0,s="",i="";break}e[e.length-1][1]===""&&e.pop();var o=!1;for(t=1;t<e.length-1;)e[t-1][0]==d&&e[t+1][0]==d&&(e[t][1].substring(e[t][1].length-e[t-1][1].length)==e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),o=!0):e[t][1].substring(0,e[t+1][1].length)==e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),o=!0)),t++;o&&this.diff_cleanupMerge(e)};c.prototype.diff_xIndex=function(e,t){var r=0,n=0,s=0,i=0,a;for(a=0;a<e.length&&(e[a][0]!==w&&(r+=e[a][1].length),e[a][0]!==_&&(n+=e[a][1].length),!(r>t));a++)s=r,i=n;return e.length!=a&&e[a][0]===_?i:i+(t-s)};c.prototype.diff_prettyHtml=function(e){for(var t=[],r=/&/g,n=/</g,s=/>/g,i=/\n/g,a=0;a<e.length;a++){var o=e[a][0],l=e[a][1],f=l.replace(r,"&amp;").replace(n,"&lt;").replace(s,"&gt;").replace(i,"&para;<br>");switch(o){case w:t[a]='<ins style="background:#e6ffe6;">'+f+"</ins>";break;case _:t[a]='<del style="background:#ffe6e6;">'+f+"</del>";break;case d:t[a]="<span>"+f+"</span>";break}}return t.join("")};c.prototype.diff_text1=function(e){for(var t=[],r=0;r<e.length;r++)e[r][0]!==w&&(t[r]=e[r][1]);return t.join("")};c.prototype.diff_text2=function(e){for(var t=[],r=0;r<e.length;r++)e[r][0]!==_&&(t[r]=e[r][1]);return t.join("")};c.prototype.diff_levenshtein=function(e){for(var t=0,r=0,n=0,s=0;s<e.length;s++){var i=e[s][0],a=e[s][1];switch(i){case w:r+=a.length;break;case _:n+=a.length;break;case d:t+=Math.max(r,n),r=0,n=0;break}}return t+=Math.max(r,n),t};c.prototype.diff_toDelta=function(e){for(var t=[],r=0;r<e.length;r++)switch(e[r][0]){case w:t[r]="+"+encodeURI(e[r][1]);break;case _:t[r]="-"+e[r][1].length;break;case d:t[r]="="+e[r][1].length;break}return t.join("	").replace(/%20/g," ")};c.prototype.diff_fromDelta=function(e,t){for(var r=[],n=0,s=0,i=t.split(/\t/g),a=0;a<i.length;a++){var o=i[a].substring(1);switch(i[a].charAt(0)){case"+":try{r[n++]=new c.Diff(w,decodeURI(o))}catch{throw new Error("Illegal escape in diff_fromDelta: "+o)}break;case"-":case"=":var l=parseInt(o,10);if(isNaN(l)||l<0)throw new Error("Invalid number in diff_fromDelta: "+o);var f=e.substring(s,s+=l);i[a].charAt(0)=="="?r[n++]=new c.Diff(d,f):r[n++]=new c.Diff(_,f);break;default:if(i[a])throw new Error("Invalid diff operation in diff_fromDelta: "+i[a])}}if(s!=e.length)throw new Error("Delta length ("+s+") does not equal source text length ("+e.length+").");return r};c.prototype.match_main=function(e,t,r){if(e==null||t==null||r==null)throw new Error("Null input. (match_main)");return r=Math.max(0,Math.min(r,e.length)),e==t?0:e.length?e.substring(r,r+t.length)==t?r:this.match_bitap_(e,t,r):-1};c.prototype.match_bitap_=function(e,t,r){if(t.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var n=this.match_alphabet_(t),s=this;function i(E,k){var I=E/t.length,T=Math.abs(r-k);return s.Match_Distance?I+T/s.Match_Distance:T?1:I}var a=this.Match_Threshold,o=e.indexOf(t,r);o!=-1&&(a=Math.min(i(0,o),a),o=e.lastIndexOf(t,r+t.length),o!=-1&&(a=Math.min(i(0,o),a)));var l=1<<t.length-1;o=-1;for(var f,h,u=t.length+e.length,g,p=0;p<t.length;p++){for(f=0,h=u;f<h;)i(p,r+h)<=a?f=h:u=h,h=Math.floor((u-f)/2+f);u=h;var v=Math.max(1,r-h+1),b=Math.min(r+h,e.length)+t.length,A=Array(b+2);A[b+1]=(1<<p)-1;for(var m=b;m>=v;m--){var D=n[e.charAt(m-1)];if(p===0?A[m]=(A[m+1]<<1|1)&D:A[m]=(A[m+1]<<1|1)&D|((g[m+1]|g[m])<<1|1)|g[m+1],A[m]&l){var y=i(p,m-1);if(y<=a)if(a=y,o=m-1,o>r)v=Math.max(1,2*r-o);else break}}if(i(p+1,r)>a)break;g=A}return o};c.prototype.match_alphabet_=function(e){for(var t={},r=0;r<e.length;r++)t[e.charAt(r)]=0;for(var r=0;r<e.length;r++)t[e.charAt(r)]|=1<<e.length-r-1;return t};c.prototype.patch_addContext_=function(e,t){if(t.length!=0){if(e.start2===null)throw Error("patch not initialized");for(var r=t.substring(e.start2,e.start2+e.length1),n=0;t.indexOf(r)!=t.lastIndexOf(r)&&r.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)n+=this.Patch_Margin,r=t.substring(e.start2-n,e.start2+e.length1+n);n+=this.Patch_Margin;var s=t.substring(e.start2-n,e.start2);s&&e.diffs.unshift(new c.Diff(d,s));var i=t.substring(e.start2+e.length1,e.start2+e.length1+n);i&&e.diffs.push(new c.Diff(d,i)),e.start1-=s.length,e.start2-=s.length,e.length1+=s.length+i.length,e.length2+=s.length+i.length}};c.prototype.patch_make=function(e,t,r){var n,s;if(typeof e=="string"&&typeof t=="string"&&typeof r>"u")n=e,s=this.diff_main(n,t,!0),s.length>2&&(this.diff_cleanupSemantic(s),this.diff_cleanupEfficiency(s));else if(e&&typeof e=="object"&&typeof t>"u"&&typeof r>"u")s=e,n=this.diff_text1(s);else if(typeof e=="string"&&t&&typeof t=="object"&&typeof r>"u")n=e,s=t;else if(typeof e=="string"&&typeof t=="string"&&r&&typeof r=="object")n=e,s=r;else throw new Error("Unknown call format to patch_make.");if(s.length===0)return[];for(var i=[],a=new c.patch_obj,o=0,l=0,f=0,h=n,u=n,g=0;g<s.length;g++){var p=s[g][0],v=s[g][1];switch(!o&&p!==d&&(a.start1=l,a.start2=f),p){case w:a.diffs[o++]=s[g],a.length2+=v.length,u=u.substring(0,f)+v+u.substring(f);break;case _:a.length1+=v.length,a.diffs[o++]=s[g],u=u.substring(0,f)+u.substring(f+v.length);break;case d:v.length<=2*this.Patch_Margin&&o&&s.length!=g+1?(a.diffs[o++]=s[g],a.length1+=v.length,a.length2+=v.length):v.length>=2*this.Patch_Margin&&o&&(this.patch_addContext_(a,h),i.push(a),a=new c.patch_obj,o=0,h=u,l=f);break}p!==w&&(l+=v.length),p!==_&&(f+=v.length)}return o&&(this.patch_addContext_(a,h),i.push(a)),i};c.prototype.patch_deepCopy=function(e){for(var t=[],r=0;r<e.length;r++){var n=e[r],s=new c.patch_obj;s.diffs=[];for(var i=0;i<n.diffs.length;i++)s.diffs[i]=new c.Diff(n.diffs[i][0],n.diffs[i][1]);s.start1=n.start1,s.start2=n.start2,s.length1=n.length1,s.length2=n.length2,t[r]=s}return t};c.prototype.patch_apply=function(e,t){if(e.length==0)return[t,[]];e=this.patch_deepCopy(e);var r=this.patch_addPadding(e);t=r+t+r,this.patch_splitMax(e);for(var n=0,s=[],i=0;i<e.length;i++){var a=e[i].start2+n,o=this.diff_text1(e[i].diffs),l,f=-1;if(o.length>this.Match_MaxBits?(l=this.match_main(t,o.substring(0,this.Match_MaxBits),a),l!=-1&&(f=this.match_main(t,o.substring(o.length-this.Match_MaxBits),a+o.length-this.Match_MaxBits),(f==-1||l>=f)&&(l=-1))):l=this.match_main(t,o,a),l==-1)s[i]=!1,n-=e[i].length2-e[i].length1;else{s[i]=!0,n=l-a;var h;if(f==-1?h=t.substring(l,l+o.length):h=t.substring(l,f+this.Match_MaxBits),o==h)t=t.substring(0,l)+this.diff_text2(e[i].diffs)+t.substring(l+o.length);else{var u=this.diff_main(o,h,!1);if(o.length>this.Match_MaxBits&&this.diff_levenshtein(u)/o.length>this.Patch_DeleteThreshold)s[i]=!1;else{this.diff_cleanupSemanticLossless(u);for(var g=0,p,v=0;v<e[i].diffs.length;v++){var b=e[i].diffs[v];b[0]!==d&&(p=this.diff_xIndex(u,g)),b[0]===w?t=t.substring(0,l+p)+b[1]+t.substring(l+p):b[0]===_&&(t=t.substring(0,l+p)+t.substring(l+this.diff_xIndex(u,g+b[1].length))),b[0]!==_&&(g+=b[1].length)}}}}}return t=t.substring(r.length,t.length-r.length),[t,s]};c.prototype.patch_addPadding=function(e){for(var t=this.Patch_Margin,r="",n=1;n<=t;n++)r+=String.fromCharCode(n);for(var n=0;n<e.length;n++)e[n].start1+=t,e[n].start2+=t;var s=e[0],i=s.diffs;if(i.length==0||i[0][0]!=d)i.unshift(new c.Diff(d,r)),s.start1-=t,s.start2-=t,s.length1+=t,s.length2+=t;else if(t>i[0][1].length){var a=t-i[0][1].length;i[0][1]=r.substring(i[0][1].length)+i[0][1],s.start1-=a,s.start2-=a,s.length1+=a,s.length2+=a}if(s=e[e.length-1],i=s.diffs,i.length==0||i[i.length-1][0]!=d)i.push(new c.Diff(d,r)),s.length1+=t,s.length2+=t;else if(t>i[i.length-1][1].length){var a=t-i[i.length-1][1].length;i[i.length-1][1]+=r.substring(0,a),s.length1+=a,s.length2+=a}return r};c.prototype.patch_splitMax=function(e){for(var t=this.Match_MaxBits,r=0;r<e.length;r++)if(!(e[r].length1<=t)){var n=e[r];e.splice(r--,1);for(var s=n.start1,i=n.start2,a="";n.diffs.length!==0;){var o=new c.patch_obj,l=!0;for(o.start1=s-a.length,o.start2=i-a.length,a!==""&&(o.length1=o.length2=a.length,o.diffs.push(new c.Diff(d,a)));n.diffs.length!==0&&o.length1<t-this.Patch_Margin;){var f=n.diffs[0][0],h=n.diffs[0][1];f===w?(o.length2+=h.length,i+=h.length,o.diffs.push(n.diffs.shift()),l=!1):f===_&&o.diffs.length==1&&o.diffs[0][0]==d&&h.length>2*t?(o.length1+=h.length,s+=h.length,l=!1,o.diffs.push(new c.Diff(f,h)),n.diffs.shift()):(h=h.substring(0,t-o.length1-this.Patch_Margin),o.length1+=h.length,s+=h.length,f===d?(o.length2+=h.length,i+=h.length):l=!1,o.diffs.push(new c.Diff(f,h)),h==n.diffs[0][1]?n.diffs.shift():n.diffs[0][1]=n.diffs[0][1].substring(h.length))}a=this.diff_text2(o.diffs),a=a.substring(a.length-this.Patch_Margin);var u=this.diff_text1(n.diffs).substring(0,this.Patch_Margin);u!==""&&(o.length1+=u.length,o.length2+=u.length,o.diffs.length!==0&&o.diffs[o.diffs.length-1][0]===d?o.diffs[o.diffs.length-1][1]+=u:o.diffs.push(new c.Diff(d,u))),l||e.splice(++r,0,o)}}};c.prototype.patch_toText=function(e){for(var t=[],r=0;r<e.length;r++)t[r]=e[r];return t.join("")};c.prototype.patch_fromText=function(e){var t=[];if(!e)return t;for(var r=e.split(`
`),n=0,s=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;n<r.length;){var i=r[n].match(s);if(!i)throw new Error("Invalid patch string: "+r[n]);var a=new c.patch_obj;for(t.push(a),a.start1=parseInt(i[1],10),i[2]===""?(a.start1--,a.length1=1):i[2]=="0"?a.length1=0:(a.start1--,a.length1=parseInt(i[2],10)),a.start2=parseInt(i[3],10),i[4]===""?(a.start2--,a.length2=1):i[4]=="0"?a.length2=0:(a.start2--,a.length2=parseInt(i[4],10)),n++;n<r.length;){var o=r[n].charAt(0);try{var l=decodeURI(r[n].substring(1))}catch{throw new Error("Illegal escape in patch_fromText: "+l)}if(o=="-")a.diffs.push(new c.Diff(_,l));else if(o=="+")a.diffs.push(new c.Diff(w,l));else if(o==" ")a.diffs.push(new c.Diff(d,l));else{if(o=="@")break;if(o!=="")throw new Error('Invalid patch mode "'+o+'" in: '+l)}n++}}return t};c.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0};c.patch_obj.prototype.toString=function(){var e,t;this.length1===0?e=this.start1+",0":this.length1==1?e=this.start1+1:e=this.start1+1+","+this.length1,this.length2===0?t=this.start2+",0":this.length2==1?t=this.start2+1:t=this.start2+1+","+this.length2;for(var r=["@@ -"+e+" +"+t+` @@
`],n,s=0;s<this.diffs.length;s++){switch(this.diffs[s][0]){case w:n="+";break;case _:n="-";break;case d:n=" ";break}r[s+1]=n+encodeURI(this.diffs[s][1])+`
`}return r.join("").replace(/%20/g," ")};re.exports=c;re.exports.diff_match_patch=c;re.exports.DIFF_DELETE=_;re.exports.DIFF_INSERT=w;re.exports.DIFF_EQUAL=d});function gt(e,...t){let r=[],{length:n}=e;for(let i=0;i<n;i++)r.push(e[i],t[i]);r.pop();let s=r.join("");return s=s.replaceAll(/\/\*[\s\S]*?\*\//g,""),s=s.replaceAll(/\s\/\/.*/g,""),s}var U=gt;var z="gameDirHandle",ie="mirrorDirHandle",M="log-host",le="is-disabled",F="status-ok",N="status-warning",B="status-progress",j="btn-game",ce="btn-mirror",Z="btn-retrieve",Q="btn-preview",X="btn-save",P="diff-list",H="diff-path",fe="diff-label",se="diff-new",Y="diff-identical",x="diff-changed",K="diff-content",ee="diff-collapsed";var pt=U`
    /* ================== GENERAL ================== */

    #setup.${le} {
        pointer-events: none;
    }

    #setup button {
        padding: 4px 6px;
        cursor: pointer;
        font-size: inherit;
    }
    
    #setup button[disabled] {
        cursor: default;
    }

    #setup button progress {
        display: none;
    }

    /* ================== STATUSES ================== */

    #setup .${F}:after {
        content: ' ✅';
    }

    #setup .${N}:after {
        content: ' ⚠️';
    }

    #setup .${B} progress {
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

    #setup .${P} textarea {
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
`,he=pt;var dt=U`
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

    ${he}
`,Pe=dt;var vt=`
<style>${Pe}</style>
<div class='steps'>
    <!-- ==== SELECT =================================== -->
    <div class='step'>
        <div class='title'>1. Select game data directory</div>
        <div class='about'>
            Give read-access to the local install directory of the game so the parser can choose what files it needs.
        </div>
        <div class='action'>
            Action: <button class='${j}'>Pick directory</button> 
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
`,Le=vt;var ue,Ne,mt={info:"\u2139\uFE0F",warning:"\u26A0\uFE0F",error:"\u26D4"};function bt(e,...t){let r=e.endsWith("!")?e.startsWith("!")?"error":"warning":"info";_t(r,e,t)}function $e(e){ue=e,Ne=ue.querySelector("table")}function _t(e,t,r){let s=new Date().toLocaleTimeString("en-GB",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3}),i=document.createElement("tr");Se(i,s),Se(i,mt[e]),Se(i,wt(t,r)),Ne.appendChild(i),ue.scrollTo({top:ue.scrollHeight,behavior:"smooth"})}function Se(e,t){let r=document.createElement("td");t=t instanceof Node?t:document.createTextNode(t),r.appendChild(t),e.appendChild(r)}function wt(e,t){if(e=e.replace(/^!/,""),console.log(e,...t),!t.length)return document.createTextNode(e);let r=document.createElement("div"),n=document.createElement("div");n.innerHTML=e,n.onclick=function(){let i=this.nextElementSibling.style.display!=="none";this.nextElementSibling.style.display=i?"none":"block"},r.appendChild(n);let s=document.createElement("textarea");return s.style.display="none",s.innerHTML=St(t),r.appendChild(s),r}function St(e){let t=[];for(let r of e)typeof r=="object"&&r?r instanceof Error?t.push(r.stack):t.push(JSON.stringify(r,null,4)):t.push(r);return t.join(`
`)}var S=bt;var Dt=U`
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        font-size: 13px;
        font-family: "JetBrains Mono", monospace;
    }

    .${P} pre {
        font-family: "JetBrains Mono", monospace;
    }

    .${H} {
        font-weight: bold;
        background: silver;
        padding: 8px;
        cursor: pointer;
    }

    .${fe} {
        float: right;
        border: solid 1px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        padding: 4px;
        margin-right: -5px;
        margin-top: -5px;
    }

    .${H}.${se} {
        background: rgba(0, 0, 255, 0.2);
        border-top: solid 1px rgba(0, 0, 255, 0.4);
    }

    .${H}.${Y} {
        background: rgba(0, 255, 0, 0.2);
        border-top: solid 1px rgba(0, 255, 0, 0.4);
    }

    .${H}.${x} {
        background: rgba(255, 100, 0, 0.2);
        border-top: solid 1px rgba(255, 100, 0, 0.4);
    }

    .${K} {
        display: flex;
        flex-direction: row;
    }

    .${K}.${ee} {
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
`,ge=Dt;var yt=U`
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

    .${P} {
        background: #fff;
        color: #000;
        flex-grow: 1;
        overflow-y: scroll;
    }

    ${he}
    ${ge}
`,Ce=yt;var Et=`
<style>${Ce}</style>
<div class='bar'>
    <button class='${j}'>Pick game directory</button>
    <button class='${ce}'>Pick mirror directory</button> 
</div>
<div class='${P}'>
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
`,Oe=Et;var Be=window.location.host||"localhost",te="store";async function L(e){if(!(await indexedDB.databases()).find(n=>n.name===Be))return;let r=await He();if(!r.objectStoreNames.contains(te)){r.close();return}return new Promise((n,s)=>{let i=r.transaction(te).objectStore(te).get(e);i.onsuccess=()=>{n(i.result),r.close()},i.onerror=()=>{s(i.error),r.close()}})}async function pe(e,t){let r=await He();return new Promise((n,s)=>{let i=r.transaction(te,"readwrite");i.objectStore(te).put(t,e),i.oncomplete=()=>{n(),r.close()},i.onerror=()=>{s(i.error),r.close()}})}function He(){return new Promise((e,t)=>{let r=indexedDB.open(Be);r.onupgradeneeded=n=>n.target.result.createObjectStore(te),r.onsuccess=()=>e(r.result),r.onerror=()=>t(r.error)})}async function At(e,t,r){return new Promise(n=>{let s=i=>{let a=i.data&&typeof i.data=="object"?i.data:{};a.type===t&&(e.removeEventListener("message",s),n(a.payload))};e.addEventListener("message",s),e.postMessage({type:t,payload:r})})}var De=At;function Tt(e,t,r){e.postMessage({type:t,payload:r})}var Ge=Tt;async function Mt(e,t,r,n){return Ue(e,"",t,r,n)}async function Ue(e,t,r,n,s){t+=t?"/":"";let i={},a=await It(e);for(let[o,l]of a){let f=t+o;if(!(n&&f.match(n))){if(l.kind==="directory"){let h=await Ue(l,f,r,n,s);if(h instanceof File)return h;Object.assign(i,h)}else if(f.match(r)){let h=await l.getFile();if(s)return h;i[f]=h}}}return i}async function It(e){let t=[];try{for await(let r of e.entries())t.push(r)}catch{}return t}var je=Mt;async function kt(e){return await e?.queryPermission()==="granted"}var $=kt;function Rt(e){return document.querySelector("."+e)}var G=Rt;function Ft(e,t,r){let n;if(typeof t=="string"?(t.match(/^[a-z]/)&&(t="."+t),n=Array.from(document.querySelectorAll(t))):Array.isArray(t)?n=t:n=[t],!n.length)return console.log(`No target for ${e}!`);for(let s of n)s.addEventListener(e,r)}var C=Ft;var de=ut(We(),1),Pt=new de.default;function Lt(e,t){let r=Ve(e),n=Ve(t),s=Pt.diff_main(r,n),i=[],a=[];for(let[h,u]of s)switch(h){case de.default.DIFF_DELETE:i.push("<del>"+u+"</del>"),a.push("<del></del>");break;case de.default.DIFF_INSERT:i.push("<ins></ins>"),a.push("<ins>"+u+"</ins>");break;default:i.push(u),a.push(u)}let o=i.join("").replaceAll("</del><ins></ins>","</del>"),l=a.join("").replaceAll("<del></del><ins>","<ins>"),f=l.split("<").length-1;return{text1:o,text2:l,differences:f/2}}function Ve(e){return e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")}var ze=Lt;var Nt={[se]:"new",[Y]:"identical",[x]:"changed"};function $t(e,t,r){let n=[];for(let i in t){let a=t[i],o=e[i];if(o!==void 0){let{text1:f,text2:h}=ze(o,a);o=f,a=h}else a=Ot(a);let l=Ct(i,o,a);n.push(...l)}r.innerHTML=n.join("");let s=Array.from(r.querySelectorAll("."+H));C("click",s,Bt),Ht(r)}function Ct(e,t,r){let n=t===void 0?se:t===r?Y:x,s=`<div class="${fe}">${Nt[n]}</div>`,i=n===Y?ee:"",a=[];return a.push(`<div class="${H} ${n}">${s}${e}</div>`),a.push(`<div class="${K} ${i}">`),n===x&&a.push(`<pre>${t}</pre>`),a.push(`<pre>${r}</pre>`),a.push("</div>"),a}function Ot(e){return e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")}function Bt(e){e.currentTarget.nextElementSibling.classList.toggle(ee)}function Ht(e){let t=e.querySelectorAll("."+H);for(let r of t)if(!r.nextElementSibling.classList.contains(ee)){r.scrollIntoView({behavior:"smooth",block:"start"});break}}var ve=$t;var Gt=new RegExp("[ :]");function Ut(e){if(e.match(Gt)){S("Path contains an illegal character!",e);return}if(e.match("/.*?/")){S("Path contains too many slashes!",e);return}let t=e;return t=t.replace(/^Main\//,""),t=t.replace("/",":"),t=t.replaceAll("~","/"),t=t.replaceAll("_"," "),t=t.replaceAll("#",":"),t=t.replace(/\.lua$/,""),t=t.replace(/\.wiki$/,""),t}var me=Ut;var jt=new Set(["Main","Data","Media","Special","Talk","User","User talk","Project","Project talk","File","File talk","MediaWiki","MediaWiki talk","Template","Template talk","Help","Help talk","Category","Category talk","Module","Module talk"]),Wt=new Set(["css"]),Vt=new RegExp("~");function zt(e){e.match(Vt)&&S("Title contains an illegal character!",e);let{namespace:t,titleWithoutNamespace:r}=Kt(e),n=r;return n=n.replaceAll("/","~"),n=n.replaceAll(" ","_"),n=n.replaceAll(":","#"),n=Jt(n),n=qt(n,t),t.replace(" ","_")+"/"+n}function Kt(e){let[,t,r]=e.match(/(.*?):(.*)/)||[null,"",e];return jt.has(t)||(t="",r=e),t=t||"Main",{namespace:t,titleWithoutNamespace:r}}function Jt(e){let t=(e.match(/\.([a-zA-Z]+)$/)||[null,""])[1].toLowerCase();return t==="url"?e.replace(/\.url$/,""):Wt.has(t)?e:e+".wiki"}function qt(e,t){return t!=="Module"||e.endsWith("~doc.wiki")||e.endsWith(".css")?e:e.replace(".wiki",".lua")}var Ke=zt;function Zt(e,...t){if(typeof e=="function")try{let r=e(...t);return r&&typeof r.then=="function"?r.then(n=>[n,null]).catch(n=>[null,n]):[r,null]}catch(r){return[null,r]}return e&&typeof e.then=="function"?e.then(r=>[r,null]).catch(r=>[null,r]):[e,null]}var ae=Zt;var ye;async function oe(e){if(!ye){console.log("Please call applySettings() prior to asking!");return}let t={method:Qt(e)},r=new URL(ye.API_URL),n=Xt(e);t.method==="GET"?r.search=n.toString():t.body=n;let[s,i]=await ae(fetch(r,t));if(!s){S("Failed to fetch!",i);return}let[a,o]=await ae(s.json());if(!a){S("Invalid json!",o);return}return a}function Je(e){let{API_URL:t}=e;ye={API_URL:t}}function Qt(e){return!e.method||e.method==="GET"?"GET":"POST"}function Xt(e){let t={...e,format:"json",formatversion:2},{method:r}=t;if(delete t.method,r==="FORM"){let n=new FormData;for(let s in t){let i=t[s];Array.isArray(i)?n.append(s,i[0],i[1]):n.append(s,i)}return n}return new URLSearchParams(t)}var qe=50;async function Yt(e){let t=Object.keys(e).map(s=>me(s)),r=await xt(t);if(!r)return;let n={};for(let s in r){let i=Ke(s);i&&(r[s]===void 0?S("Invalid page content!",s):n[i]=r[s])}return S(`Retrieved ${Object.keys(n).length} pages.`),n}async function xt(e){let t={};for(let r=0;r<e.length;r+=qe){let n=Math.min(r+qe,e.length),s=e.slice(r,n);S(`Retrieving ${r+1}-${n} of ${e.length} pages (${s[0]})...`);let i=await oe({action:"query",prop:"revisions",rvprop:"content",rvslots:"main",titles:s.join("|"),origin:"*"});if(!i)continue;let a=i.query?.pages||[];for(let o of a)o.missing||(t[o.title]=o.revisions?.[0]?.slots?.main?.content)}return t}var Ze=Yt;function er(e,t){e.classList.toggle(F,t===F),e.classList.toggle(N,t===N),e.classList.toggle(B,t===B)}var W=er;async function tr(e,t){let r=rr(e,t);if(!r.length)return S("All pages are already updated."),!0;let n=await nr();if(!n)return S("Cannot get csrf token!"),!1;let s=0;for(let{title:i,content:a}of r)await ir(i,a,n)&&s++;return S(`Successfully saved ${s} pages.`),!0}async function rr(e,t){let r=[];t=t||{};for(let n in e){let s=e[n],i=t[n];if(s!==i){let a=me(n);r.push({title:a,content:s})}}return r}async function nr(){return(await oe({action:"query",meta:"tokens"}))?.query?.tokens?.csrftoken}async function ir(e,t,r){return S(`Saving content for "${e}"...`),(await oe({method:"POST",action:"edit",title:e,text:t,token:r}))?.edit?.result!=="Success"?(S("Save failed!",e,t),!1):!0}var Qe=tr;function sr(){return document.location.href.replace(/[^\/]*$/,"")+"api.php"}var Xe=sr;var Ye,xe,Ee,be,_e,we,J,V={parserResult:null,mirrorResult:null,progressingButton:null,hasDirAccess:!1,hasPreviewed:!1,hasSaved:!1};async function ar(e,t){Ye=e,xe=t,Ee=G(j),be=G(Z),_e=G(Q),we=G(X),C("click",Ee,lr),C("click",be,cr),C("click",_e,fr),C("click",we,hr),J=await L(z),q({hasDirAccess:await $(J)}),Je({API_URL:Xe()})}function q(e){Object.assign(V,e),or()}function or(){let{hasDirAccess:e,progressingButton:t,mirrorResult:r,hasPreviewed:n,hasSaved:s}=V;Ye.classList.toggle(le,!!t),W(Ee,e?F:N);let i;t===Z?i=B:i=r?F:null,W(be,i),be.disabled=!e;let a;t===Q?a=B:a=n?F:null,W(_e,a),_e.disabled=!e;let o;t===X?o=B:o=s?F:null,W(we,o),we.disabled=!e}async function lr(){let{hasDirAccess:e}=V,t=!1;if(J?e?t=!0:await J.requestPermission():t=!0,t){let[r]=await ae(window.showDirectoryPicker,{mode:"read"});J=r,await pe(z,J)}q({parserResult:null,mirrorResult:null,progressingButton:null,hasDirAccess:await $(J),hasPreviewed:!1,hasSaved:!1})}async function cr(){await Ae(Z),q({mirrorResult:await Ze(V.parserResult)})}async function fr(){await Ae(Q);let e=window.open("","Preview");if(!e)return;let t=e.document;t.open(),t.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Preview</title>
            <style>${ge}</style>
        </head>
        <body>
            <div class='${P}'></div>
        </body>
        </html>
    `),t.close();let{mirrorResult:r,parserResult:n}=V;ve(r||{},n,t.querySelector("."+P)),q({hasPreviewed:!0})}async function hr(){await Ae(X);let e=await Qe(V.parserResult,V.mirrorResult);q({hasSaved:e})}async function Ae(e){if(!V.parserResult){q({isWorking:!0,progressingButton:e});let t=await xe();q({parserResult:t,isWorking:!0,progressingButton:null})}}var et=ar;async function ur(e){let t=await L(e);if(t&&!await $(t)){if(await t.requestPermission(),await $(t))return t}try{t=await window.showDirectoryPicker({mode:"read"})}catch{}return t&&await pe(e,t),t}var Te=ur;async function gr(e,t){let r=t.split("/"),n=r.pop(),s=e;for(let a of r)try{s=await s.getDirectoryHandle(a)}catch{return}let i;try{i=await s.getFileHandle(n)}catch{return}try{return await i.getFile()}catch{}}var tt=gr;var rt,Me,Ie,ke={hasGameAccess:!1,hasMirrorAccess:!1};async function pr(e,t){rt=t,Me=G(j),Ie=G(ce),C("click",Me,mr),C("click",Ie,br),await Re()}function dr(e){Object.assign(ke,e),vr()}function vr(){let{hasGameAccess:e,hasMirrorAccess:t}=ke;W(Me,e?F:N),W(Ie,t?F:N)}async function mr(){let e=await L(z),t=await Te(z);await e.isSameEntry(t)||await Re()}async function br(){let e=await L(ie),t=await Te(ie);await e.isSameEntry(t)||await Re()}async function Re(){let e=await L(z),t=await L(ie);if(dr({hasGameAccess:$(e),hasMirrorAccess:$(t)}),!ke.hasGameAccess)return;let r=await rt(),n=await _r(r);ve(n,r,G(P))}async function _r(e){let t={},r=await L(ie);if(!await $(r))return t;for(let n in e){let s=await tt(r,n);t[n]=s?await s.text():void 0}return t}var nt=pr;var wr="gameDirHandle",ne;async function Sr(){let e=document.getElementById("setup");if(!e)return;let t=e.dataset.dev==="1",r=e.dataset.parse;e.innerHTML=t?Oe:Le,$e(e.querySelector("."+M)),S("Initialized."),await Dr(r),t?await nt(e,it):await et(e,it)}async function Dr(e){ne=new Worker(`data:application/javascript,importScripts('${e}');`),ne.addEventListener("error",()=>S("!Parser error!")),await De(ne,"ready"),S("Connected to parser."),ne.addEventListener("message",yr)}async function yr(e){let t=e.data&&typeof e.data=="object"?e.data:{},{type:r,payload:n}=t;switch(r){case"find":{let s=await L(wr),[i,a,o]=n,l=await je(s,i,a,o);Ge(ne,"find",l);break}case"log":{S(...n);break}}}async function it(){S("Started parsing...");let e=await De(ne,"run");return S(`Received ${Object.keys(e).length} parsing results.`),e}Sr();})();
