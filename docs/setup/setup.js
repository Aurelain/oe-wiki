(()=>{var Ve=Object.create;var be=Object.defineProperty;var Ue=Object.getOwnPropertyDescriptor;var ze=Object.getOwnPropertyNames;var We=Object.getPrototypeOf,Je=Object.prototype.hasOwnProperty;var Qe=(e,r)=>()=>{try{return r||e((r={exports:{}}).exports,r),r.exports}catch(t){throw r=0,t}};var Xe=(e,r,t,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of ze(r))!Je.call(e,a)&&a!==t&&be(e,a,{get:()=>r[a],enumerable:!(i=Ue(r,a))||i.enumerable});return e};var Ye=(e,r,t)=>(t=e!=null?Ve(We(e)):{},Xe(r||!e||!e.__esModule?be(t,"default",{value:e,enumerable:!0}):t,e));var ke=Qe((Dt,X)=>{var f=function(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32},_=-1,w=1,p=0;f.Diff=function(e,r){return[e,r]};f.prototype.diff_main=function(e,r,t,i){typeof i>"u"&&(this.Diff_Timeout<=0?i=Number.MAX_VALUE:i=new Date().getTime()+this.Diff_Timeout*1e3);var a=i;if(e==null||r==null)throw new Error("Null input. (diff_main)");if(e==r)return e?[new f.Diff(p,e)]:[];typeof t>"u"&&(t=!0);var n=t,s=this.diff_commonPrefix(e,r),o=e.substring(0,s);e=e.substring(s),r=r.substring(s),s=this.diff_commonSuffix(e,r);var l=e.substring(e.length-s);e=e.substring(0,e.length-s),r=r.substring(0,r.length-s);var h=this.diff_compute_(e,r,n,a);return o&&h.unshift(new f.Diff(p,o)),l&&h.push(new f.Diff(p,l)),this.diff_cleanupMerge(h),h};f.prototype.diff_compute_=function(e,r,t,i){var a;if(!e)return[new f.Diff(w,r)];if(!r)return[new f.Diff(_,e)];var n=e.length>r.length?e:r,s=e.length>r.length?r:e,o=n.indexOf(s);if(o!=-1)return a=[new f.Diff(w,n.substring(0,o)),new f.Diff(p,s),new f.Diff(w,n.substring(o+s.length))],e.length>r.length&&(a[0][0]=a[2][0]=_),a;if(s.length==1)return[new f.Diff(_,e),new f.Diff(w,r)];var l=this.diff_halfMatch_(e,r);if(l){var h=l[0],c=l[1],u=l[2],g=l[3],d=l[4],v=this.diff_main(h,u,t,i),b=this.diff_main(c,g,t,i);return v.concat([new f.Diff(p,d)],b)}return t&&e.length>100&&r.length>100?this.diff_lineMode_(e,r,i):this.diff_bisect_(e,r,i)};f.prototype.diff_lineMode_=function(e,r,t){var i=this.diff_linesToChars_(e,r);e=i.chars1,r=i.chars2;var a=i.lineArray,n=this.diff_main(e,r,!1,t);this.diff_charsToLines_(n,a),this.diff_cleanupSemantic(n),n.push(new f.Diff(p,""));for(var s=0,o=0,l=0,h="",c="";s<n.length;){switch(n[s][0]){case w:l++,c+=n[s][1];break;case _:o++,h+=n[s][1];break;case p:if(o>=1&&l>=1){n.splice(s-o-l,o+l),s=s-o-l;for(var u=this.diff_main(h,c,!1,t),g=u.length-1;g>=0;g--)n.splice(s,0,u[g]);s=s+u.length}l=0,o=0,h="",c="";break}s++}return n.pop(),n};f.prototype.diff_bisect_=function(e,r,t){for(var i=e.length,a=r.length,n=Math.ceil((i+a)/2),s=n,o=2*n,l=new Array(o),h=new Array(o),c=0;c<o;c++)l[c]=-1,h[c]=-1;l[s+1]=0,h[s+1]=0;for(var u=i-a,g=u%2!=0,d=0,v=0,b=0,S=0,m=0;m<n&&!(new Date().getTime()>t);m++){for(var D=-m+d;D<=m-v;D+=2){var E=s+D,y;D==-m||D!=m&&l[E-1]<l[E+1]?y=l[E+1]:y=l[E-1]+1;for(var A=y-D;y<i&&A<a&&e.charAt(y)==r.charAt(A);)y++,A++;if(l[E]=y,y>i)v+=2;else if(A>a)d+=2;else if(g){var T=s+u-D;if(T>=0&&T<o&&h[T]!=-1){var I=i-h[T];if(y>=I)return this.diff_bisectSplit_(e,r,y,A,t)}}}for(var R=-m+b;R<=m-S;R+=2){var T=s+R,I;R==-m||R!=m&&h[T-1]<h[T+1]?I=h[T+1]:I=h[T-1]+1;for(var O=I-R;I<i&&O<a&&e.charAt(i-I-1)==r.charAt(a-O-1);)I++,O++;if(h[T]=I,I>i)S+=2;else if(O>a)b+=2;else if(!g){var E=s+u-R;if(E>=0&&E<o&&l[E]!=-1){var y=l[E],A=s+y-E;if(I=i-I,y>=I)return this.diff_bisectSplit_(e,r,y,A,t)}}}}return[new f.Diff(_,e),new f.Diff(w,r)]};f.prototype.diff_bisectSplit_=function(e,r,t,i,a){var n=e.substring(0,t),s=r.substring(0,i),o=e.substring(t),l=r.substring(i),h=this.diff_main(n,s,!1,a),c=this.diff_main(o,l,!1,a);return h.concat(c)};f.prototype.diff_linesToChars_=function(e,r){var t=[],i={};t[0]="";function a(l){for(var h="",c=0,u=-1,g=t.length;u<l.length-1;){u=l.indexOf(`
`,c),u==-1&&(u=l.length-1);var d=l.substring(c,u+1);(i.hasOwnProperty?i.hasOwnProperty(d):i[d]!==void 0)?h+=String.fromCharCode(i[d]):(g==n&&(d=l.substring(c),u=l.length),h+=String.fromCharCode(g),i[d]=g,t[g++]=d),c=u+1}return h}var n=4e4,s=a(e);n=65535;var o=a(r);return{chars1:s,chars2:o,lineArray:t}};f.prototype.diff_charsToLines_=function(e,r){for(var t=0;t<e.length;t++){for(var i=e[t][1],a=[],n=0;n<i.length;n++)a[n]=r[i.charCodeAt(n)];e[t][1]=a.join("")}};f.prototype.diff_commonPrefix=function(e,r){if(!e||!r||e.charAt(0)!=r.charAt(0))return 0;for(var t=0,i=Math.min(e.length,r.length),a=i,n=0;t<a;)e.substring(n,a)==r.substring(n,a)?(t=a,n=t):i=a,a=Math.floor((i-t)/2+t);return a};f.prototype.diff_commonSuffix=function(e,r){if(!e||!r||e.charAt(e.length-1)!=r.charAt(r.length-1))return 0;for(var t=0,i=Math.min(e.length,r.length),a=i,n=0;t<a;)e.substring(e.length-a,e.length-n)==r.substring(r.length-a,r.length-n)?(t=a,n=t):i=a,a=Math.floor((i-t)/2+t);return a};f.prototype.diff_commonOverlap_=function(e,r){var t=e.length,i=r.length;if(t==0||i==0)return 0;t>i?e=e.substring(t-i):t<i&&(r=r.substring(0,t));var a=Math.min(t,i);if(e==r)return a;for(var n=0,s=1;;){var o=e.substring(a-s),l=r.indexOf(o);if(l==-1)return n;s+=l,(l==0||e.substring(a-s)==r.substring(0,s))&&(n=s,s++)}};f.prototype.diff_halfMatch_=function(e,r){if(this.Diff_Timeout<=0)return null;var t=e.length>r.length?e:r,i=e.length>r.length?r:e;if(t.length<4||i.length*2<t.length)return null;var a=this;function n(v,b,S){for(var m=v.substring(S,S+Math.floor(v.length/4)),D=-1,E="",y,A,T,I;(D=b.indexOf(m,D+1))!=-1;){var R=a.diff_commonPrefix(v.substring(S),b.substring(D)),O=a.diff_commonSuffix(v.substring(0,S),b.substring(0,D));E.length<O+R&&(E=b.substring(D-O,D)+b.substring(D,D+R),y=v.substring(0,S-O),A=v.substring(S+R),T=b.substring(0,D-O),I=b.substring(D+R))}return E.length*2>=v.length?[y,A,T,I,E]:null}var s=n(t,i,Math.ceil(t.length/4)),o=n(t,i,Math.ceil(t.length/2)),l;if(!s&&!o)return null;o?s?l=s[4].length>o[4].length?s:o:l=o:l=s;var h,c,u,g;e.length>r.length?(h=l[0],c=l[1],u=l[2],g=l[3]):(u=l[0],g=l[1],h=l[2],c=l[3]);var d=l[4];return[h,c,u,g,d]};f.prototype.diff_cleanupSemantic=function(e){for(var r=!1,t=[],i=0,a=null,n=0,s=0,o=0,l=0,h=0;n<e.length;)e[n][0]==p?(t[i++]=n,s=l,o=h,l=0,h=0,a=e[n][1]):(e[n][0]==w?l+=e[n][1].length:h+=e[n][1].length,a&&a.length<=Math.max(s,o)&&a.length<=Math.max(l,h)&&(e.splice(t[i-1],0,new f.Diff(_,a)),e[t[i-1]+1][0]=w,i--,i--,n=i>0?t[i-1]:-1,s=0,o=0,l=0,h=0,a=null,r=!0)),n++;for(r&&this.diff_cleanupMerge(e),this.diff_cleanupSemanticLossless(e),n=1;n<e.length;){if(e[n-1][0]==_&&e[n][0]==w){var c=e[n-1][1],u=e[n][1],g=this.diff_commonOverlap_(c,u),d=this.diff_commonOverlap_(u,c);g>=d?(g>=c.length/2||g>=u.length/2)&&(e.splice(n,0,new f.Diff(p,u.substring(0,g))),e[n-1][1]=c.substring(0,c.length-g),e[n+1][1]=u.substring(g),n++):(d>=c.length/2||d>=u.length/2)&&(e.splice(n,0,new f.Diff(p,c.substring(0,d))),e[n-1][0]=w,e[n-1][1]=u.substring(0,u.length-d),e[n+1][0]=_,e[n+1][1]=c.substring(d),n++),n++}n++}};f.prototype.diff_cleanupSemanticLossless=function(e){function r(d,v){if(!d||!v)return 6;var b=d.charAt(d.length-1),S=v.charAt(0),m=b.match(f.nonAlphaNumericRegex_),D=S.match(f.nonAlphaNumericRegex_),E=m&&b.match(f.whitespaceRegex_),y=D&&S.match(f.whitespaceRegex_),A=E&&b.match(f.linebreakRegex_),T=y&&S.match(f.linebreakRegex_),I=A&&d.match(f.blanklineEndRegex_),R=T&&v.match(f.blanklineStartRegex_);return I||R?5:A||T?4:m&&!E&&y?3:E||y?2:m||D?1:0}for(var t=1;t<e.length-1;){if(e[t-1][0]==p&&e[t+1][0]==p){var i=e[t-1][1],a=e[t][1],n=e[t+1][1],s=this.diff_commonSuffix(i,a);if(s){var o=a.substring(a.length-s);i=i.substring(0,i.length-s),a=o+a.substring(0,a.length-s),n=o+n}for(var l=i,h=a,c=n,u=r(i,a)+r(a,n);a.charAt(0)===n.charAt(0);){i+=a.charAt(0),a=a.substring(1)+n.charAt(0),n=n.substring(1);var g=r(i,a)+r(a,n);g>=u&&(u=g,l=i,h=a,c=n)}e[t-1][1]!=l&&(l?e[t-1][1]=l:(e.splice(t-1,1),t--),e[t][1]=h,c?e[t+1][1]=c:(e.splice(t+1,1),t--))}t++}};f.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/;f.whitespaceRegex_=/\s/;f.linebreakRegex_=/[\r\n]/;f.blanklineEndRegex_=/\n\r?\n$/;f.blanklineStartRegex_=/^\r?\n\r?\n/;f.prototype.diff_cleanupEfficiency=function(e){for(var r=!1,t=[],i=0,a=null,n=0,s=!1,o=!1,l=!1,h=!1;n<e.length;)e[n][0]==p?(e[n][1].length<this.Diff_EditCost&&(l||h)?(t[i++]=n,s=l,o=h,a=e[n][1]):(i=0,a=null),l=h=!1):(e[n][0]==_?h=!0:l=!0,a&&(s&&o&&l&&h||a.length<this.Diff_EditCost/2&&s+o+l+h==3)&&(e.splice(t[i-1],0,new f.Diff(_,a)),e[t[i-1]+1][0]=w,i--,a=null,s&&o?(l=h=!0,i=0):(i--,n=i>0?t[i-1]:-1,l=h=!1),r=!0)),n++;r&&this.diff_cleanupMerge(e)};f.prototype.diff_cleanupMerge=function(e){e.push(new f.Diff(p,""));for(var r=0,t=0,i=0,a="",n="",s;r<e.length;)switch(e[r][0]){case w:i++,n+=e[r][1],r++;break;case _:t++,a+=e[r][1],r++;break;case p:t+i>1?(t!==0&&i!==0&&(s=this.diff_commonPrefix(n,a),s!==0&&(r-t-i>0&&e[r-t-i-1][0]==p?e[r-t-i-1][1]+=n.substring(0,s):(e.splice(0,0,new f.Diff(p,n.substring(0,s))),r++),n=n.substring(s),a=a.substring(s)),s=this.diff_commonSuffix(n,a),s!==0&&(e[r][1]=n.substring(n.length-s)+e[r][1],n=n.substring(0,n.length-s),a=a.substring(0,a.length-s))),r-=t+i,e.splice(r,t+i),a.length&&(e.splice(r,0,new f.Diff(_,a)),r++),n.length&&(e.splice(r,0,new f.Diff(w,n)),r++),r++):r!==0&&e[r-1][0]==p?(e[r-1][1]+=e[r][1],e.splice(r,1)):r++,i=0,t=0,a="",n="";break}e[e.length-1][1]===""&&e.pop();var o=!1;for(r=1;r<e.length-1;)e[r-1][0]==p&&e[r+1][0]==p&&(e[r][1].substring(e[r][1].length-e[r-1][1].length)==e[r-1][1]?(e[r][1]=e[r-1][1]+e[r][1].substring(0,e[r][1].length-e[r-1][1].length),e[r+1][1]=e[r-1][1]+e[r+1][1],e.splice(r-1,1),o=!0):e[r][1].substring(0,e[r+1][1].length)==e[r+1][1]&&(e[r-1][1]+=e[r+1][1],e[r][1]=e[r][1].substring(e[r+1][1].length)+e[r+1][1],e.splice(r+1,1),o=!0)),r++;o&&this.diff_cleanupMerge(e)};f.prototype.diff_xIndex=function(e,r){var t=0,i=0,a=0,n=0,s;for(s=0;s<e.length&&(e[s][0]!==w&&(t+=e[s][1].length),e[s][0]!==_&&(i+=e[s][1].length),!(t>r));s++)a=t,n=i;return e.length!=s&&e[s][0]===_?n:n+(r-a)};f.prototype.diff_prettyHtml=function(e){for(var r=[],t=/&/g,i=/</g,a=/>/g,n=/\n/g,s=0;s<e.length;s++){var o=e[s][0],l=e[s][1],h=l.replace(t,"&amp;").replace(i,"&lt;").replace(a,"&gt;").replace(n,"&para;<br>");switch(o){case w:r[s]='<ins style="background:#e6ffe6;">'+h+"</ins>";break;case _:r[s]='<del style="background:#ffe6e6;">'+h+"</del>";break;case p:r[s]="<span>"+h+"</span>";break}}return r.join("")};f.prototype.diff_text1=function(e){for(var r=[],t=0;t<e.length;t++)e[t][0]!==w&&(r[t]=e[t][1]);return r.join("")};f.prototype.diff_text2=function(e){for(var r=[],t=0;t<e.length;t++)e[t][0]!==_&&(r[t]=e[t][1]);return r.join("")};f.prototype.diff_levenshtein=function(e){for(var r=0,t=0,i=0,a=0;a<e.length;a++){var n=e[a][0],s=e[a][1];switch(n){case w:t+=s.length;break;case _:i+=s.length;break;case p:r+=Math.max(t,i),t=0,i=0;break}}return r+=Math.max(t,i),r};f.prototype.diff_toDelta=function(e){for(var r=[],t=0;t<e.length;t++)switch(e[t][0]){case w:r[t]="+"+encodeURI(e[t][1]);break;case _:r[t]="-"+e[t][1].length;break;case p:r[t]="="+e[t][1].length;break}return r.join("	").replace(/%20/g," ")};f.prototype.diff_fromDelta=function(e,r){for(var t=[],i=0,a=0,n=r.split(/\t/g),s=0;s<n.length;s++){var o=n[s].substring(1);switch(n[s].charAt(0)){case"+":try{t[i++]=new f.Diff(w,decodeURI(o))}catch{throw new Error("Illegal escape in diff_fromDelta: "+o)}break;case"-":case"=":var l=parseInt(o,10);if(isNaN(l)||l<0)throw new Error("Invalid number in diff_fromDelta: "+o);var h=e.substring(a,a+=l);n[s].charAt(0)=="="?t[i++]=new f.Diff(p,h):t[i++]=new f.Diff(_,h);break;default:if(n[s])throw new Error("Invalid diff operation in diff_fromDelta: "+n[s])}}if(a!=e.length)throw new Error("Delta length ("+a+") does not equal source text length ("+e.length+").");return t};f.prototype.match_main=function(e,r,t){if(e==null||r==null||t==null)throw new Error("Null input. (match_main)");return t=Math.max(0,Math.min(t,e.length)),e==r?0:e.length?e.substring(t,t+r.length)==r?t:this.match_bitap_(e,r,t):-1};f.prototype.match_bitap_=function(e,r,t){if(r.length>this.Match_MaxBits)throw new Error("Pattern too long for this browser.");var i=this.match_alphabet_(r),a=this;function n(y,A){var T=y/r.length,I=Math.abs(t-A);return a.Match_Distance?T+I/a.Match_Distance:I?1:T}var s=this.Match_Threshold,o=e.indexOf(r,t);o!=-1&&(s=Math.min(n(0,o),s),o=e.lastIndexOf(r,t+r.length),o!=-1&&(s=Math.min(n(0,o),s)));var l=1<<r.length-1;o=-1;for(var h,c,u=r.length+e.length,g,d=0;d<r.length;d++){for(h=0,c=u;h<c;)n(d,t+c)<=s?h=c:u=c,c=Math.floor((u-h)/2+h);u=c;var v=Math.max(1,t-c+1),b=Math.min(t+c,e.length)+r.length,S=Array(b+2);S[b+1]=(1<<d)-1;for(var m=b;m>=v;m--){var D=i[e.charAt(m-1)];if(d===0?S[m]=(S[m+1]<<1|1)&D:S[m]=(S[m+1]<<1|1)&D|((g[m+1]|g[m])<<1|1)|g[m+1],S[m]&l){var E=n(d,m-1);if(E<=s)if(s=E,o=m-1,o>t)v=Math.max(1,2*t-o);else break}}if(n(d+1,t)>s)break;g=S}return o};f.prototype.match_alphabet_=function(e){for(var r={},t=0;t<e.length;t++)r[e.charAt(t)]=0;for(var t=0;t<e.length;t++)r[e.charAt(t)]|=1<<e.length-t-1;return r};f.prototype.patch_addContext_=function(e,r){if(r.length!=0){if(e.start2===null)throw Error("patch not initialized");for(var t=r.substring(e.start2,e.start2+e.length1),i=0;r.indexOf(t)!=r.lastIndexOf(t)&&t.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)i+=this.Patch_Margin,t=r.substring(e.start2-i,e.start2+e.length1+i);i+=this.Patch_Margin;var a=r.substring(e.start2-i,e.start2);a&&e.diffs.unshift(new f.Diff(p,a));var n=r.substring(e.start2+e.length1,e.start2+e.length1+i);n&&e.diffs.push(new f.Diff(p,n)),e.start1-=a.length,e.start2-=a.length,e.length1+=a.length+n.length,e.length2+=a.length+n.length}};f.prototype.patch_make=function(e,r,t){var i,a;if(typeof e=="string"&&typeof r=="string"&&typeof t>"u")i=e,a=this.diff_main(i,r,!0),a.length>2&&(this.diff_cleanupSemantic(a),this.diff_cleanupEfficiency(a));else if(e&&typeof e=="object"&&typeof r>"u"&&typeof t>"u")a=e,i=this.diff_text1(a);else if(typeof e=="string"&&r&&typeof r=="object"&&typeof t>"u")i=e,a=r;else if(typeof e=="string"&&typeof r=="string"&&t&&typeof t=="object")i=e,a=t;else throw new Error("Unknown call format to patch_make.");if(a.length===0)return[];for(var n=[],s=new f.patch_obj,o=0,l=0,h=0,c=i,u=i,g=0;g<a.length;g++){var d=a[g][0],v=a[g][1];switch(!o&&d!==p&&(s.start1=l,s.start2=h),d){case w:s.diffs[o++]=a[g],s.length2+=v.length,u=u.substring(0,h)+v+u.substring(h);break;case _:s.length1+=v.length,s.diffs[o++]=a[g],u=u.substring(0,h)+u.substring(h+v.length);break;case p:v.length<=2*this.Patch_Margin&&o&&a.length!=g+1?(s.diffs[o++]=a[g],s.length1+=v.length,s.length2+=v.length):v.length>=2*this.Patch_Margin&&o&&(this.patch_addContext_(s,c),n.push(s),s=new f.patch_obj,o=0,c=u,l=h);break}d!==w&&(l+=v.length),d!==_&&(h+=v.length)}return o&&(this.patch_addContext_(s,c),n.push(s)),n};f.prototype.patch_deepCopy=function(e){for(var r=[],t=0;t<e.length;t++){var i=e[t],a=new f.patch_obj;a.diffs=[];for(var n=0;n<i.diffs.length;n++)a.diffs[n]=new f.Diff(i.diffs[n][0],i.diffs[n][1]);a.start1=i.start1,a.start2=i.start2,a.length1=i.length1,a.length2=i.length2,r[t]=a}return r};f.prototype.patch_apply=function(e,r){if(e.length==0)return[r,[]];e=this.patch_deepCopy(e);var t=this.patch_addPadding(e);r=t+r+t,this.patch_splitMax(e);for(var i=0,a=[],n=0;n<e.length;n++){var s=e[n].start2+i,o=this.diff_text1(e[n].diffs),l,h=-1;if(o.length>this.Match_MaxBits?(l=this.match_main(r,o.substring(0,this.Match_MaxBits),s),l!=-1&&(h=this.match_main(r,o.substring(o.length-this.Match_MaxBits),s+o.length-this.Match_MaxBits),(h==-1||l>=h)&&(l=-1))):l=this.match_main(r,o,s),l==-1)a[n]=!1,i-=e[n].length2-e[n].length1;else{a[n]=!0,i=l-s;var c;if(h==-1?c=r.substring(l,l+o.length):c=r.substring(l,h+this.Match_MaxBits),o==c)r=r.substring(0,l)+this.diff_text2(e[n].diffs)+r.substring(l+o.length);else{var u=this.diff_main(o,c,!1);if(o.length>this.Match_MaxBits&&this.diff_levenshtein(u)/o.length>this.Patch_DeleteThreshold)a[n]=!1;else{this.diff_cleanupSemanticLossless(u);for(var g=0,d,v=0;v<e[n].diffs.length;v++){var b=e[n].diffs[v];b[0]!==p&&(d=this.diff_xIndex(u,g)),b[0]===w?r=r.substring(0,l+d)+b[1]+r.substring(l+d):b[0]===_&&(r=r.substring(0,l+d)+r.substring(l+this.diff_xIndex(u,g+b[1].length))),b[0]!==_&&(g+=b[1].length)}}}}}return r=r.substring(t.length,r.length-t.length),[r,a]};f.prototype.patch_addPadding=function(e){for(var r=this.Patch_Margin,t="",i=1;i<=r;i++)t+=String.fromCharCode(i);for(var i=0;i<e.length;i++)e[i].start1+=r,e[i].start2+=r;var a=e[0],n=a.diffs;if(n.length==0||n[0][0]!=p)n.unshift(new f.Diff(p,t)),a.start1-=r,a.start2-=r,a.length1+=r,a.length2+=r;else if(r>n[0][1].length){var s=r-n[0][1].length;n[0][1]=t.substring(n[0][1].length)+n[0][1],a.start1-=s,a.start2-=s,a.length1+=s,a.length2+=s}if(a=e[e.length-1],n=a.diffs,n.length==0||n[n.length-1][0]!=p)n.push(new f.Diff(p,t)),a.length1+=r,a.length2+=r;else if(r>n[n.length-1][1].length){var s=r-n[n.length-1][1].length;n[n.length-1][1]+=t.substring(0,s),a.length1+=s,a.length2+=s}return t};f.prototype.patch_splitMax=function(e){for(var r=this.Match_MaxBits,t=0;t<e.length;t++)if(!(e[t].length1<=r)){var i=e[t];e.splice(t--,1);for(var a=i.start1,n=i.start2,s="";i.diffs.length!==0;){var o=new f.patch_obj,l=!0;for(o.start1=a-s.length,o.start2=n-s.length,s!==""&&(o.length1=o.length2=s.length,o.diffs.push(new f.Diff(p,s)));i.diffs.length!==0&&o.length1<r-this.Patch_Margin;){var h=i.diffs[0][0],c=i.diffs[0][1];h===w?(o.length2+=c.length,n+=c.length,o.diffs.push(i.diffs.shift()),l=!1):h===_&&o.diffs.length==1&&o.diffs[0][0]==p&&c.length>2*r?(o.length1+=c.length,a+=c.length,l=!1,o.diffs.push(new f.Diff(h,c)),i.diffs.shift()):(c=c.substring(0,r-o.length1-this.Patch_Margin),o.length1+=c.length,a+=c.length,h===p?(o.length2+=c.length,n+=c.length):l=!1,o.diffs.push(new f.Diff(h,c)),c==i.diffs[0][1]?i.diffs.shift():i.diffs[0][1]=i.diffs[0][1].substring(c.length))}s=this.diff_text2(o.diffs),s=s.substring(s.length-this.Patch_Margin);var u=this.diff_text1(i.diffs).substring(0,this.Patch_Margin);u!==""&&(o.length1+=u.length,o.length2+=u.length,o.diffs.length!==0&&o.diffs[o.diffs.length-1][0]===p?o.diffs[o.diffs.length-1][1]+=u:o.diffs.push(new f.Diff(p,u))),l||e.splice(++t,0,o)}}};f.prototype.patch_toText=function(e){for(var r=[],t=0;t<e.length;t++)r[t]=e[t];return r.join("")};f.prototype.patch_fromText=function(e){var r=[];if(!e)return r;for(var t=e.split(`
`),i=0,a=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;i<t.length;){var n=t[i].match(a);if(!n)throw new Error("Invalid patch string: "+t[i]);var s=new f.patch_obj;for(r.push(s),s.start1=parseInt(n[1],10),n[2]===""?(s.start1--,s.length1=1):n[2]=="0"?s.length1=0:(s.start1--,s.length1=parseInt(n[2],10)),s.start2=parseInt(n[3],10),n[4]===""?(s.start2--,s.length2=1):n[4]=="0"?s.length2=0:(s.start2--,s.length2=parseInt(n[4],10)),i++;i<t.length;){var o=t[i].charAt(0);try{var l=decodeURI(t[i].substring(1))}catch{throw new Error("Illegal escape in patch_fromText: "+l)}if(o=="-")s.diffs.push(new f.Diff(_,l));else if(o=="+")s.diffs.push(new f.Diff(w,l));else if(o==" ")s.diffs.push(new f.Diff(p,l));else{if(o=="@")break;if(o!=="")throw new Error('Invalid patch mode "'+o+'" in: '+l)}i++}}return r};f.patch_obj=function(){this.diffs=[],this.start1=null,this.start2=null,this.length1=0,this.length2=0};f.patch_obj.prototype.toString=function(){var e,r;this.length1===0?e=this.start1+",0":this.length1==1?e=this.start1+1:e=this.start1+1+","+this.length1,this.length2===0?r=this.start2+",0":this.length2==1?r=this.start2+1:r=this.start2+1+","+this.length2;for(var t=["@@ -"+e+" +"+r+` @@
`],i,a=0;a<this.diffs.length;a++){switch(this.diffs[a][0]){case w:i="+";break;case _:i="-";break;case p:i=" ";break}t[a+1]=i+encodeURI(this.diffs[a][1])+`
`}return t.join("").replace(/%20/g," ")};X.exports=f;X.exports.diff_match_patch=f;X.exports.DIFF_DELETE=_;X.exports.DIFF_INSERT=w;X.exports.DIFF_EQUAL=p});function Ze(e,...r){let t=[],{length:i}=e;for(let n=0;n<i;n++)t.push(e[n],r[n]);t.pop();let a=t.join("");return a=a.replaceAll(/\/\*[\s\S]*?\*\//g,""),a=a.replaceAll(/\s\/\/.*/g,""),a}var G=Ze;var N="gameDirHandle",K="mirrorDirHandle",M="log-host",k="btn-game",j="btn-mirror",q="btn-retrieve",x="btn-preview",ee="btn-save",H="is-granted",re="has-progress",L="diff-list",B="diff-path",ie="diff-label",te="diff-new",z="diff-identical",W="diff-changed",V="diff-content",J="diff-collapsed";var Ke=G`
    #setup button {
        padding: 4px 6px;
        cursor: pointer;
        font-size: inherit;
    }
    
    #setup button progress {
        display: none;
    }
    
    #setup button.${re} progress {
        display: inline-block;
    }

    /* ================== LOG ================== */

    #setup .${k}:after,
    #setup .${j}:after {
        content: ' ⚠️';
    }

    #setup .${H}:after {
        content: ' ✅';
    }

    /* ================== LOG ================== */

    #setup .log-title {
        margin-top: 32px;
        padding: 8px 0;
    }

    #setup .${M} {
        overflow-y: scroll;

    }

    #setup .${L} textarea {
        font-family: "JetBrains Mono", monospace;
    }

    #setup .${M} table {
        width: 100%;
        border-collapse: collapse;
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
        //border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
    }

    #setup .${M} textarea {
        width: calc(100% - 8px);
        height: 200px;
    }
`,ae=Ke;var qe=G`
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

    #setup .${H}:after {
        content: ' ✅';
    }
    
    ${ae}
`,_e=qe;var xe=`
<style>${_e}</style>
<div class='steps'>
    <!-- ==== SELECT =================================== -->
    <div class='step'>
        <div class='title'>1. Select game data directory</div>
        <div class='about'>
            Give read-access to the local install directory of the game so the parser can choose what files it needs.
        </div>
        <div class='action'>
            Action: <button class='${k}'>Pick directory</button> 
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
            Action: <button class='${q}'>Retrieve <progress/></button> 
        </div>
    </div>
    <!-- ==== PREVIEW =================================== -->
    <div class='step'>
        <div class='title'>3. Preview changes</div>
        <div class='about'>
            Open a popup window listing each page that is about to be updated, potentially highlighting differences.
        </div>
        <div class='action'>
            Action: <button class='${x}'>Preview <progress/></button> 
        </div>
    </div>
    <!-- ==== SAVE =================================== -->
    <div class='step'>
        <div class='title'>4. Save changes</div>
        <div class='about'>
            Write the changes to each page using the current account, just as if you had done them manually.
        </div>
        <div class='action'>
            Action: <button class='${ee}'>SAVE <progress/></button> 
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
`,we=xe;var se,De,er={info:"\u2139\uFE0F",warning:"\u26A0\uFE0F",error:"\u26D4"};function rr(e,...r){let t=e.endsWith("!")?e.startsWith("!")?"error":"warning":"info";tr(t,e,r)}function Ee(e){se=e,De=se.querySelector("table")}function tr(e,r,t){let a=new Date().toLocaleTimeString("en-GB",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit",fractionalSecondDigits:3}),n=document.createElement("tr");ue(n,a),ue(n,er[e]),ue(n,nr(r,t)),De.appendChild(n),se.scrollTo({top:se.scrollHeight,behavior:"smooth"})}function ue(e,r){let t=document.createElement("td");r=r instanceof Node?r:document.createTextNode(r),t.appendChild(r),e.appendChild(t)}function nr(e,r){if(e=e.replace(/^!/,""),console.log(e,...r),!r.length)return document.createTextNode(e);let t=document.createElement("div"),i=document.createElement("div");i.innerHTML=e,i.onclick=function(){let n=this.nextElementSibling.style.display!=="none";this.nextElementSibling.style.display=n?"none":"block"},t.appendChild(i);let a=document.createElement("textarea");return a.style.display="none",a.innerHTML=JSON.stringify(r,null,4),t.appendChild(a),t}var U=rr;var ir=G`
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

    .${B} {
        font-weight: bold;
        background: silver;
        padding: 8px;
        cursor: pointer;
    }

    .${ie} {
        float: right;
        border: solid 1px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        padding: 4px;
        margin-right: -5px;
        margin-top: -5px;
    }

    .${B}.${te} {
        background: rgba(0, 0, 255, 0.2);
        border-top: solid 1px rgba(0, 0, 255, 0.4);
    }

    .${B}.${z} {
        background: rgba(0, 255, 0, 0.2);
        border-top: solid 1px rgba(0, 255, 0, 0.4);
    }

    .${B}.${W} {
        background: rgba(255, 100, 0, 0.2);
        border-top: solid 1px rgba(255, 100, 0, 0.4);
    }

    .${V} {
        display: flex;
        flex-direction: row;
    }

    .${V}.${J} {
        display: none;
    }

    .${V} pre {
        margin: 0;
        flex: 1;
        min-width: 0;
        padding: 8px;
    }

    .${V} pre:nth-child(2) {
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
`,oe=ir;var ar=G`
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
    .${L} {
        background: #fff;
        color:#000;
        flex-grow: 1;
        overflow-y: scroll;
    }
    .${M} {
        height: 200px;
        flex-shrink: 0;
    }
    
    ${ae}
    ${oe}
`,ye=ar;var sr=`
<style>${ye}</style>
<div class='bar'>
    <button class='${k}'>Pick game directory</button>
    <button class='${j}'>Pick mirror directory</button> 
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
`,Me=sr;var Se=window.location.host||"localhost",Q="store";async function F(e){if(!(await indexedDB.databases()).find(i=>i.name===Se))return;let t=await Te();if(!t.objectStoreNames.contains(Q)){t.close();return}return new Promise((i,a)=>{let n=t.transaction(Q).objectStore(Q).get(e);n.onsuccess=()=>{i(n.result),t.close()},n.onerror=()=>{a(n.error),t.close()}})}async function Ie(e,r){let t=await Te();return new Promise((i,a)=>{let n=t.transaction(Q,"readwrite");n.objectStore(Q).put(r,e),n.oncomplete=()=>{i(),t.close()},n.onerror=()=>{a(n.error),t.close()}})}function Te(){return new Promise((e,r)=>{let t=indexedDB.open(Se);t.onupgradeneeded=i=>i.target.result.createObjectStore(Q),t.onsuccess=()=>e(t.result),t.onerror=()=>r(t.error)})}async function or(e,r,t){return new Promise(i=>{let a=n=>{let s=n.data&&typeof n.data=="object"?n.data:{};s.type===r&&(e.removeEventListener("message",a),i(s.payload))};e.addEventListener("message",a),e.postMessage({type:r,payload:t})})}var ge=or;function lr(e,r,t){e.postMessage({type:r,payload:t})}var Ae=lr;async function fr(e,r,t,i){return Fe(e,"",r,t,i)}async function Fe(e,r,t,i,a){r+=r?"/":"";let n={},s=await hr(e);for(let[o,l]of s){let h=r+o;if(!(i&&h.match(i))){if(l.kind==="directory"){let c=await Fe(l,h,t,i,a);if(c instanceof File)return c;Object.assign(n,c)}else if(h.match(t)){let c=await l.getFile();if(a)return c;n[h]=c}}}return n}async function hr(e){let r=[];try{for await(let t of e.entries())r.push(t)}catch{}return r}var Re=fr;async function cr(e){return await e?.queryPermission()==="granted"}var P=cr;function ur(e){return document.querySelector("."+e)}var $=ur;function gr(e,r,t){r.match(/^[a-z]/)&&(r="."+r);let i;typeof r=="string"?i=Array.from(document.querySelectorAll(r)):Array.isArray(r)?i=r:i=[r];for(let a of i)a.addEventListener(e,t)}var C=gr;async function dr(e){let r=await F(e);if(r&&!await P(r)){if(await r.requestPermission(),await P(r))return r}try{r=await window.showDirectoryPicker({mode:"read"})}catch{}return r&&await Ie(e,r),r}var ne=dr;var le=Ye(ke(),1),pr=new le.default;function vr(e,r){let t=Le(e),i=Le(r),a=pr.diff_main(t,i),n=[],s=[];for(let[c,u]of a)switch(c){case le.default.DIFF_DELETE:n.push("<del>"+u+"</del>"),s.push("<del></del>");break;case le.default.DIFF_INSERT:n.push("<ins></ins>"),s.push("<ins>"+u+"</ins>");break;default:n.push(u),s.push(u)}let o=n.join("").replaceAll("</del><ins></ins>","</del>"),l=s.join("").replaceAll("<del></del><ins>","<ins>"),h=l.split("<").length-1;return{text1:o,text2:l,differences:h/2}}function Le(e){return e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")}var Ne=vr;var mr={[te]:"new",[z]:"identical",[W]:"changed"};function br(e,r,t){let i=[];for(let a in r){let n=r[a],s=e[a];if(s!==void 0){let{text1:l,text2:h}=Ne(s,n);s=l,n=h}else n=wr(n);let o=_r(a,s,n);i.push(...o)}t.innerHTML=i.join(""),C("click","."+B,Dr),Er(t)}function _r(e,r,t){let i=r===void 0?te:r===t?z:W,a=`<div class="${ie}">${mr[i]}</div>`,n=i===z?J:"",s=[];return s.push(`<div class="${B} ${i}">${a}${e}</div>`),s.push(`<div class="${V} ${n}">`),i===W&&s.push(`<pre>${r}</pre>`),s.push(`<pre>${t}</pre>`),s.push("</div>"),s}function wr(e){return e.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")}function Dr(e){e.currentTarget.nextElementSibling.classList.toggle(J)}function Er(e){let r=e.querySelectorAll("."+B);for(let t of r)if(!t.nextElementSibling.classList.contains(J)){t.scrollIntoView({behavior:"smooth",block:"start"});break}}var fe=br;var Pe,he=null,$e=null,Y=!1;async function yr(e){Pe=e,C("click",k,Mr),C("click",q,Sr),C("click",x,Ir),C("click",ee,Tr),await ce()}async function Mr(){let e=await F(N);await ne(N);let r=await F(N);await e.isSameEntry(r)||(he=null,$e=null),await ce()}async function Sr(e){await de(e)}async function Ir(e){await de(e);let r=window.open("","Preview");if(!r)return;let t=r.document;t.open(),t.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Diff</title>
            <style>${oe}</style>
        </head>
        <body>
            <div class='${L}'></div>
        </body>
        </html>
    `),t.close(),fe({},he,t.querySelector("."+L))}async function Tr(e){await de(e)}async function ce(){let e=await F(N),r=await P(e);$(k).classList.toggle(H,r),$(k).disabled=Y,$(q).disabled=Y||!r||!!$e,$(x).disabled=Y||!r,$(ee).disabled=Y||!r}async function de({currentTarget:e}){he||(Y=!0,await ce(),e.classList.add(re),he=await Pe(),e.classList.remove(re),Y=!1,await ce())}var Ce=yr;async function Ar(e,r){let t=r.split("/"),i=t.pop(),a=e;for(let s of t)try{a=await a.getDirectoryHandle(s)}catch{return}let n;try{n=await a.getFileHandle(i)}catch{return}try{return await n.getFile()}catch{}}var Oe=Ar;var Be,pe=null,He=null;async function Fr(e){Be=e,C("click",k,Rr),C("click",j,kr),await ve(),await me()}async function Rr(){let e=await F(N),r=await ne(N);await e.isSameEntry(r)||(await ve(),await me())}async function kr(){let e=await F(K),r=await ne(K);await e.isSameEntry(r)||(await ve(),await me())}async function ve(){let e=await F(N),r=await P(e);$(k).classList.toggle(H,r);let t=await F(K),i=await P(t);$(j).classList.toggle(H,i)}async function me(){let e=await F(N);await P(e)&&(pe=await Be(),He=await Lr(),fe(He,pe,$(L)))}async function Lr(){let e={},r=await F(K);if(!await P(r))return e;for(let t in pe){let i=await Oe(r,t);e[t]=i?await i.text():void 0}return e}var Ge=Fr;var Nr="gameDirHandle",Z;async function Pr(){let e=document.getElementById("setup");if(!e)return;let r=e.dataset.dev==="1",t=e.dataset.parse;e.innerHTML=r?Me:we,Ee(e.querySelector("."+M)),U("Initialized."),await $r(t),r?await Ge(je):await Ce(je)}async function $r(e){Z=new Worker(`data:application/javascript,importScripts('${e}');`),Z.addEventListener("error",()=>U("!Parser error!")),await ge(Z,"ready"),U("Connected to parser."),Z.addEventListener("message",Cr)}async function Cr(e){let r=e.data&&typeof e.data=="object"?e.data:{},{type:t,payload:i}=r;switch(t){case"find":{let a=await F(Nr),[n,s,o]=i,l=await Re(a,n,s,o);Ae(Z,"find",l);break}case"log":{U(...i);break}}}async function je(){U("Started parsing...");let e=await ge(Z,"run");return U(`Received parsing results (${Object.keys(e).length}).`),e}Pr();})();
