(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();const g=e=>e,c=e=>({map:t=>c(t(e)),fold:t=>t(e)}),ae=()=>{Number(globalThis.globalScore)>Number(localStorage.getItem("best-score"))&&localStorage.setItem("best-score",`${globalThis.globalScore}`),window.location.reload()},I=()=>window.innerWidth>0?window.innerWidth:screen.width,x=e=>e.map(t=>t.map(n=>`${n.value}+${n.pValue}`)).toString(),$e=e=>{let t=2;for(;t*t<e;)t++;return t},X=e=>{const t=e.split(","),n=[],r=t.map(o=>{const l=o.indexOf("+"),s=o.slice(0,l),i=o.slice(l+1);return{value:Number(s),pValue:Number(i),id:0}});for(;r.length;)n.push(r.splice(0,$e(t.length)));return n},O=e=>e>2?Math.pow(2,11)*e:Math.pow(2,11),L=(e,t)=>{let n=150;return e===4&&(n=Be(t)),e===6&&(n=Ae(t)),e===8&&(n=Ne(t)),n};function Be(e){return e<=S?78:e<=$?88:e<=B?92:e<=A?94.5:e<=Z?96:e<=_?101.5:e<=J?105:(e<=Q,120)}function Ae(e){return e<=S?52:e<=$?60:e<=B?61:e<=A?62.5:e<=Z?63.5:e<=_?67:e<=J?70:e<=Q?90:76}function Ne(e){return e<=S?38.5:e<=$?43:e<=B?46:e<=A?46.5:e<=Z?47.5:e<=_?50:e<=J?52:(e<=Q,70)}const S=320,$=360,B=375,A=384,Z=390,_=414,J=428,Q=800,Me=({digitLength:e,actualScreenWidth:t})=>t<=S?e<3?20:18:t<=$?e<3?30:20:t<=B||t<=A?e<3?35:22:40,Pe=({digitLength:e,actualScreenWidth:t})=>t<=S||t<=$?e<3?24:20:t<=B?e<3?30:20:t<=A?e<3?35:22:24,Ve=({digitLength:e,actualScreenWidth:t})=>t<=S?e<3?24:16:t<=$?e<3?22:20:t<=B?e<3?25:22:t<=A?e<3?28:20:24;//!!Todo
function Ie({boardSize:e,actualScreenWidth:t,digitLength:n}){let r=40;return e===4&&(r=Me({actualScreenWidth:t,digitLength:n})),e===6&&(r=Pe({digitLength:n,actualScreenWidth:t})),e===8&&(r=Ve({digitLength:n,actualScreenWidth:t})),`${r}px`}const le=e=>{const t=e.filter(r=>r.value!==0),n=e.filter(r=>r.value===0);return[...t,...n]},w=e=>Array.from(e),P=e=>{const t=w(e).map(n=>w(n));return t[0].map((n,r)=>t.map(o=>o[r]))},ke=(e,t)=>{if(e.length!==t.length||!Array.isArray(e)||!Array.isArray(t))return!1;for(let n=0;n<e.length;n++)for(let r=0;r<e.length;r++)if(e[n][r].pValue!==t[n][r].pValue||e[n][r].value!==t[n][r].value||e[n][r].id!==t[n][r].id)return!1;return!0},Oe=e=>[...Array.from(e)].map((t,n)=>{const r=e[n+1];return r===void 0?n:t.value===r.value?-1:n}).map(t=>t==-1).filter(t=>t===!0).length>0,Ee=e=>{const t=le(w(e));for(let n=0;n<e.length;n++)t[n].pValue=0;for(let n=1;n<e.length;n++){let r=n-1;if(t[n].value===t[r].value){globalThis.globalScore+=t[n].value*2;let o={...t[n],pValue:0,value:0},l={...t[r],value:2*t[r].value,pValue:t[r].value};t[r]=l,t[n]=o}}return le(w(t))},ze=e=>e.flat().filter(t=>t.value===0).length<=0;function ue({cells:e,isInitial:t=!1,base:n}){const r=w(e).map(i=>w(i));if(ze(r))return r;const o=Le(r),l=o[0],s=o[1];return r[l][s].pValue=-1,t?r[l][s].value=n:r[l][s].value=Math.random()<.9?n:2*n,r}const W=({cells:e,isInitial:t,base:n,total:r})=>{let o=0,l=[...e];for(;o<r;)l=ue({cells:l,isInitial:t,base:n}),o++;return l},Le=e=>{const t=e.map((r,o)=>r.map((l,s)=>l.value===0?[o,s]:[])).flat().filter(r=>r.length>0),n=Math.floor(Math.random()*t.length);return t[n]};function R(e){return Array.from(Array(e).keys()).map(()=>Array.from(Array(e).keys())).map(t=>t.map(()=>({value:0,id:0,pValue:0})))}const j=e=>Ye(e)&&!He(e)&&!fe(e);function Re(e,t){return t-e}const ee=e=>e.flat().map(t=>t.value).sort(Re)[0],De=e=>e.slice().reverse(),se=e=>e.map(De),ce=e=>e.map(Ee),te=e=>c(e).map(ce).fold(g),ne=e=>c(e).map(se).map(ce).map(se).fold(g),ge=e=>c(e).map(P).map(te).map(P).fold(g),pe=e=>c(e).map(P).map(ne).map(P).fold(g),fe=e=>Array.from(e).map(t=>Oe(t)).filter(t=>t===!0).length!==0,He=e=>fe(P(Array.from(e))),Ye=e=>{var t;return((t=e.flat().find(n=>n.value===0))==null?void 0:t.value)!==0},k=(e,t)=>e.indexOf(t)!==-1,Fe=e=>{addEventListener("keydown",t=>{if(k(["ArrowDown","s","j"],t.key))return t.preventDefault(),e(pe);if(k(["ArrowUp","w","k"],t.key))return t.preventDefault(),e(ge);if(k(["ArrowLeft","a","h"],t.key))return t.preventDefault(),e(te);if(k(["ArrowRight","d","l"],t.key))return t.preventDefault(),e(ne);t.key==="r"&&ae()})},Ge=(e,t)=>{const n={x1:0,y1:0,x2:0,y2:0};let r;const o=i=>{i.preventDefault(),n.x1=i.touches[0].clientX,n.y1=i.touches[0].clientY};e.addEventListener("touchstart",o,{passive:!1});const l=i=>{i.preventDefault(),n.x2=i.changedTouches[0].clientX,n.y2=i.changedTouches[0].clientY};e.addEventListener("touchmove",l,{passive:!1});const s=i=>{i.preventDefault();const f=n.x2-n.x1,m=n.y2-n.y1,u=Math.abs(m),h=Math.abs(f);Math.max(u,h)>50&&(r=h>u?f>0?"right":"left":m<0?"up":"down"),r==="down"&&t(pe),r==="up"&&t(ge),r==="left"&&t(te),r==="right"&&t(ne)};e.addEventListener("touchend",s,!1)},d=(e,t,n)=>c(a("button")(n)).map(r=>(r.innerHTML=e,r)).map(r=>(r.onclick=t,r)).fold(g),a=e=>t=>c(document.createElement(e)).map(n=>(n.className+=t,n)).fold(g),me=()=>{const e=document.querySelector(".current-score"),t=globalThis.globalScore;e.innerText=`${t}`},ye=()=>{const e=document.querySelector(".best-score"),t=localStorage.getItem("best-score");if(t&&Number(t)>globalThis.globalScore&&(e.innerText=`${t}`),(!t||t===null)&&(e.innerText="0"),t===null){e.innerText="0";return}e.innerText=`${t}`},C=({board:e,cells:t,state:n,visibility:r,onClose:o,className:l,colors:s,base:i,showOnClose:f=!0})=>m=>c(a("article")("modal")).map(u=>(u.className+=` ${l??""}`,u.style.zIndex="100000",u.style.position="absolute",u.style.width="100%",u.style.visibility=r,u)).map(u=>{if(!f)return u;const h=a("button")("modal-close");return h.innerText="x",u.appendChild(h),o&&(h.onclick=o),h.onclick=()=>{e.removeChild(u),y(e),Number(globalThis.globalScore)>Number(localStorage.getItem("best-score"))&&localStorage.setItem("best-score",`${globalThis.globalScore}`),D({cells:t,board:e,state:n,colors:s,base:i})},u}).map(u=>(u.append(...m),u)).map(u=>(y(e),e.append(u),u)).fold(g),he=(e,t,n)=>c(a("section")("score")).map(r=>{const o=a("p")("score-label");o.innerText=n;const l=a("span")(`${t}`);return l.innerText=`${e}`,r.append(o,l),r}).fold(g),je=e=>he(e,"current-score","Score"),qe=()=>{const e=Number(window.localStorage.getItem("best-score"))??0;return he(e,"best-score","Best")},de=(e,t)=>c(a("header")("header")).map(n=>{const r=a("h1")("header-title");return r.innerText="2048",n.appendChild(r),n}).map(n=>{n.style.display="flex",n.style.justifyContent="space-between";const r=I(),o=L(t.length,r);return n.style.width=`${o*t.length}px`,n.style.alignItems="flex-start",n}).map(n=>{const r=a("div")("score-container");return r.append(je(e),qe()),n.append(r),n}).fold(g),Ke=e=>c(a("article")("button-bar")).map(t=>(t.style.display="flex",t)).map(t=>(t.append(...e),t)).fold(g),be=({board:e,cells:t,base:n,colors:r})=>Ke([Xe("bar restart-bar-btn"),ve({board:e,cells:t,base:n,colors:r,className:"setting-bar"}),Te({board:e,cells:t,base:n,colors:r,className:"setting-bar"}),xe({board:e,cells:t,base:n,colors:r,className:"setting-bar"})]),Ue=({board:e,cells:t,base:n,colors:r})=>et(e)([v(Je({board:e,cells:t,btnLabel:"4x4",base:n,colors:r})),v(We({board:e,cells:t,btnLabel:"6x6",base:n,colors:r})),v(Qe({board:e,cells:t,btnLabel:"8x8",base:n,colors:r})),v(ve({board:e,cells:t,base:n,colors:r,className:"setting"})),v(Te({board:e,cells:t,base:n,colors:r,className:"setting"})),v(xe({board:e,cells:t,base:n,colors:r,className:"setting"}))]),Xe=e=>d("Restart",ae,`restart-btn ${e}`),ve=({base:e,board:t,colors:n,cells:r,className:o})=>{const l=n.map((s,i)=>Ze(n,s,i,e));return d("Colors",()=>{C({board:t,cells:globalThis.globalCells?X(globalThis.globalCells):r,state:globalThis.isPlaying&&globalThis.isPlaying.length>0?globalThis.isPlaying:"idle",visibility:"visible",base:globalThis.globalBase,colors:n,className:"color-plate",showOnClose:!0})([E([_e(t,"board-color"),...l],"color-container")])},`${o??""} colors-btn`)},Ze=(e,t,n,r)=>{const o=a("p")("colors"),l=r!==2?Math.pow(2,n-1)*r:Math.pow(2,n),s=a("input")(`color-input--${l}`),i=a("label")("color-label");return i.innerText=`${n===0?"Empty Cell":l}`,s.setAttribute("type","color"),s.setAttribute("value",t),s.onchange=f=>{const m=f.target,{value:u}=m;e[n]=u},o.append(i,s),o},_e=(e,t)=>{const n=a("p")("colors"),r=a("input")(`color-input--${t}`);r.setAttribute("type","color"),r.setAttribute("value","#bbada0"),r.onchange=l=>{const s=l.target,{value:i}=s;e.style.backgroundColor=i};const o=a("label")("color-label");return o.innerText="board",n.append(o,r),n},Te=({base:e,board:t,colors:n,cells:r,className:o})=>d("Rules",()=>{C({board:t,cells:globalThis.globalCells?X(globalThis.globalCells):r,state:globalThis.isPlaying&&globalThis.isPlaying.length>0?globalThis.isPlaying:"idle",visibility:"visible",base:e,colors:n,showOnClose:!0})([N])},`${o??""} rules-btn`),xe=({board:e,cells:t,base:n,colors:r,className:o})=>d("Credits",()=>{C({board:e,cells:globalThis.globalCells?X(globalThis.globalCells):t,state:globalThis.isPlaying&&globalThis.isPlaying.length>0?globalThis.isPlaying:"idle",visibility:"visible",base:n,colors:r,showOnClose:!0})([b])},` ${o??""} credits-btn,`),N=a("p")("rules");N.style.padding="0";N.style.margin="0";N.style.paddingLeft="1em";N.style.marginTop="1em";N.innerHTML=`<strong>Press Keys</strong>    <br/><br/>
  Use Arrow keys, Vim keys or gaming keys  <br/><br/>
   &ensp;Left: "Arrow Left" or "a" or "j" <br/>
   &ensp;Right: "Arrow Right" "d" or "l"<br/>
   &ensp;Down: "Arrow Down" or "s" or "k"<br/>
   &ensp;up: "Arrow up" or "w" or "k"  <br/>
   <br/>

  &ensp;R: "To Restart the game" </br>
  </br>
  <strong>Rules</strong>
  <br/>
  If you reach 2048 in 4x4,
  <br/> 3072 in 6x6,
  <br/> 4096 in 8x8.
  <br/> You will win! &emsp;
  <strong>
  Good luck
  </strong>
`;const b=a("p")("rules");b.style.padding="0";b.style.padding="0";b.style.margin="0";b.style.paddingLeft="1em";b.style.marginTop="1em";b.innerHTML=`  
<br/>
<h2>2048</h2>
<br/><br/>
This <strong> 2048</strong> Sliding puzzle was published by  <br/>
 <a href="https://github.com/gabrielecirulli/2048"> source code by  Gabriele Cirulli</a>  <br/>
 <br/>
The font <a href="https://www.dafont.com/de/calculator.font">calculator</a> is used from Dafont.com <br/>
<br/>
Here is source Code from this <a href="https://github.com/rhnh/2048v2">repo</a>
`;const re=({board:e,base:t,cells:n,btnLabel:r,colors:o,className:l})=>s=>d(r,()=>{globalThis.isPlaying="playing",y(e),n=W({cells:R(s),isInitial:!0,base:t,total:2}),D({board:e,cells:n,state:"playing",base:t,colors:o})},`play ${l}`),Je=({board:e,cells:t,btnLabel:n,base:r,colors:o})=>re({board:e,cells:t,btnLabel:n,base:r,colors:o,className:"four"})(4),Qe=({board:e,cells:t,btnLabel:n,base:r,colors:o})=>re({board:e,cells:t,btnLabel:n,base:r,colors:o,className:"eight"})(8),We=({board:e,cells:t,btnLabel:n,base:r,colors:o})=>re({board:e,cells:t,btnLabel:n,base:r,colors:o,className:"six"})(6),q=(e,t)=>{const n=I(),r=L(t.length,n);return e.style.display="flex",e.style.height=`${r*t.length}px`,e.style.width=`${r*t.length}px`,e},E=(e,t)=>c(a("article")(t)).map(n=>n).map(n=>(n.append(...e),n)).fold(g),v=(e,t)=>c(a("div")(`wrapper ${t??""}`)).map(n=>(n.style.display="flex",n.style.justifyContent="center",n.style.alignItems="center",n.appendChild(e),n)).fold(g),et=e=>t=>c(a("article")("selection")).map(n=>(n.style.position="absolute",n.style.display="grid",n.style.gridTemplateColumns="repeat(2,1fr)",n.style.gridTemplateRows="repeat(3,1fr)",n.style.width="100%",n.style.height="100%",e.appendChild(n),n)).map(n=>(n.append(...t),n)).map(n=>(e.append(n),n)).fold(g),we=e=>c(a("section")("game-over--message")).map(t=>(t.innerHTML=e??"You lost",t)).fold(g),oe=({cells:e,board:t,base:n,colors:r})=>{e=W({cells:R(e.length),total:2,base:n,isInitial:!0}),D({cells:e,board:t,state:"playing",base:n,colors:r})},M=({base:e,board:t,cells:n,colors:r,message:o})=>C({board:t,cells:n,state:"playing",visibility:"visible",showOnClose:!1,base:e,colors:r})([q(E([we(o??`You lost! <br/> You are score <strong> ${globalThis.globalScore} </strong> `),d("Try again",()=>oe({board:t,cells:n,base:2,colors:r}),"status-btn try-again-btn")],"game-over"),n)]),V=({board:e,cells:t,base:n,colors:r})=>n<4?C({board:e,cells:t,state:"playing",visibility:"visible",base:n,colors:r,showOnClose:!1})([q(E([ie({board:e,cells:t,colors:r}),tt({base:n,board:e,cells:t,colors:r})],"next-level"),t)]):C({board:e,cells:t,state:"playing",visibility:"visible",base:n,colors:r,showOnClose:!1})([q(E([we("You won"),ie({board:e,cells:t,colors:r})],"next-level"),t)]),ie=({board:e,cells:t,colors:n})=>d("Try again",()=>{globalThis.isPlaying="playing",oe({board:e,cells:t,base:2,colors:n})},"status-btn try-again-btn"),tt=({base:e,cells:t,board:n,colors:r})=>c(a("button")("status-btn next-level-btn")).map(o=>(o.innerText="Keep playing",(e>4||globalThis.globalBase>4)&&(o.disabled=!0,o.style.display="none"),o)).map(o=>(o.onclick=()=>{e=e+1,globalThis.globalBase=e,globalThis.isPlaying="playing";const l=R(t.length);oe({board:n,cells:l,base:e,colors:r}),y(document.body),globalThis.globalCells=x(l),document.body.append(de(globalThis.globalScore,t),n,be({board:n,cells:t,colors:r,base:e}))},o)).fold(g),nt=({rgb:e,factor:t,colorConstant:n=.06899})=>({red:e.red*(1-n*t),green:e.green*(1-n*t),blue:e.blue*(1-n*t)}),rt=e=>e.startsWith("#")?e.slice(1):e,ot=e=>e.length===3?e.split("").map(t=>t+t).join(""):e,lt=e=>e.match(/.{2}/g),Y=e=>parseInt(e,16),st=e=>({red:Y(e[0]),green:Y(e[1]),blue:Y(e[2])}),F=e=>Math.min(Math.max(Math.round(e),0),255).toString(16),G=e=>e.length===1?e+0:e,it=e=>G(F(e.red))+G(F(e.green))+G(F(e.blue)),p=(e,t,n)=>c(e).map(rt).map(ot).map(lt).map(st).map(r=>nt({rgb:r,factor:t,colorConstant:n??.06899})).map(it).map(r=>`#${r}`).fold(g),T=e=>e===0?0:Math.log(e)/Math.log(2),at=e=>T(e)%1===0;function ut({cell:e,base:t,boardSize:n,colors:r}){return c(a("span")("cells")).map(o=>{const l=a("p")("cell-text");return l.style.padding="0px",l.style.margin="0px",l.innerText=e.value===0?"":`${e.value}`,l.className+=` cell-${n}x${n}--${e.value.toString().length}`,o.appendChild(l),o}).map(o=>(o.className+=` ${e.pValue===-1&&e.value===t||e.value===t*2&&e.pValue===-1?"new-cell":e.value===t*e.pValue&&e.pValue!==0?"double-cell":""}`,o)).map(o=>{const l=I(),s=Ie({actualScreenWidth:l,digitLength:`${e.value}`.length,boardSize:n});return o.style.fontSize=s,o}).map(o=>(r.map((l,s)=>{if(!at(e.value)){if(t%2!==0){const i=e.value/t;s===T(i)&&(o.style.backgroundColor=p(r[s+1],-1.4),o.style.color=p(l,1,34.34))}s===T(e.value)&&(o.style.backgroundColor=p(r[s],-1.4),o.style.color=p(l,1,34.34))}t===2&&s===T(e.value)?(o.style.backgroundColor=p(r[s],-1.4),o.style.color=p(l,5)):s===T(e.value)/t?(o.style.backgroundColor=p(r[s],-1.4),o.style.color=p(l,17)):s===T(e.value)&&(o.style.backgroundColor=p(r[s-1],-1.4),o.style.color=p(l,17))}),o)).fold(g)}const Ce=({cells:e,board:t,base:n,colors:r})=>o=>{const l=ee(e);let s=O(n);if(l===s){globalThis.isPlaying="pause",V({board:t,cells:e,base:n,colors:r});return}if(globalThis.globalCells=x(e),j(e)){globalThis.globalCells=x(e),y(t),M({board:t,cells:e,base:n,colors:r}),me();return}Number(globalThis.globalScore)>Number(localStorage.getItem("best-score"))&&localStorage.setItem("best-score",`${globalThis.globalScore}`);const i=o(e);if(ke(i,e))return z({board:t,cells:e,base:n,colors:r}),e;if(e=ue({cells:i,base:n}),j(e)){globalThis.globalCells=x(e),y(t),M({board:t,cells:e,base:n,colors:r});return}if(l===O(n)){globalThis.isPlaying="pause",V({board:t,cells:e,base:n,colors:r});return}return z({board:t,cells:e,base:n,colors:r}),e},y=e=>{for(;e.firstChild;)e.firstChild.remove()},ct=({boardSize:e})=>c(a("article")("board")).map(n=>{n.style.display="grid",n.style.position="relative";const r=I(),l=`${L(e,r)}px `.repeat(e);return n.style.gridTemplateColumns=l,n.style.gridTemplateRows=l,n.tabIndex=0,n.style.gap="1px",n}).map(n=>n).fold(g),z=({board:e,cells:t,base:n,colors:r})=>{if(globalThis.globalCells=x(t),ee(t)===O(n)){globalThis.isPlaying="pause",V({board:e,cells:t,base:n,colors:r});return}me(),ye(),y(e),t.flat().map(f=>{const m=Ce({cells:t,board:e,base:n,colors:r}),u=ut({cell:f,boardSize:t.length,base:n,colors:r});return Ge(u,m),e.append(u)}),e.style.display="grid",e.style.position="relative";const l=I(),i=`${L(t.length,l)}px `.repeat(t.length);return e.style.gridTemplateColumns=i,e.style.gridTemplateRows=i,e.tabIndex=0,e.style.gap="1px",e};function D({cells:e,board:t,state:n,base:r,colors:o}){const l=O(r),s=ee(e);if(r>=5){M({base:r,board:t,cells:e,colors:o,message:"You won! Game over!"});return}if(s===l){globalThis.isPlaying="pause",V({board:t,cells:e,base:r,colors:o});return}if(j(e)&&n==="finished")return y(t),globalThis.globalCells=x(e),M({board:t,cells:e,base:r,colors:o}),globalThis.globalScore>Number(localStorage.getItem("best-score"))&&ye(),e;if(n==="playing"){z({board:t,cells:e,base:r,colors:o});const i=Ce({cells:e,board:t,base:r,colors:o});return Fe(i),e}if(z({board:t,cells:e,base:r,colors:o}),Ue({board:t,cells:e,base:r,colors:o}),s===l||s===l){globalThis.isPlaying="pause",V({board:t,cells:e,base:r,colors:o});return}if(r>=5){M({base:r,board:t,cells:e,colors:o,message:"You won! Game over!"});return}return e}const H=2,Se=["#ccc0b3","#eee4da","#ede0c8","#f2b179","#f59563","#f67c5f","#f65e3b","#edcf72","#edcc61","#edc850","#ed2e2e","#8ecae6","#219ebc"];globalThis.globalScore=0;globalThis.globalBase=H;const K=ct({boardSize:4}),U=W({cells:R(4),base:H,isInitial:!0,total:2});document.body.append(de(0,U),K,be({board:K,cells:U,colors:Se,base:H}));D({cells:U,board:K,state:"idle",base:H,colors:Se});
