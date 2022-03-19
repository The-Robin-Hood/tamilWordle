import{e as J,T as D,i as j}from"./chunk.js";const A=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}};A();async function $(){var e=await fetch("https://tamilwordledb.herokuapp.com/allwords"),t=await e.json();f=t.wordslist,W=t.words}async function C(e){var t=await fetch("https://tamilwordledb.herokuapp.com/search?word="+e,{method:"GET"}),a=await t.json();return a.valid===!0}function z(){var e=new Date,t=new Date(e.getFullYear(),0,0),a=e-t,o=1e3*60*60*24,r=Math.floor(a/o);return f[r]}function y(e){D({text:e,duration:3e3,gravity:"top",position:"center",stopOnFocus:!0,style:{background:"white",color:"black",fontWeight:"bold"}}).showToast()}function b(e){e.forEach(t=>{t.classList.add("shake"),t.addEventListener("animationend",function(){t.classList.remove("shake")},{once:!0})})}function G(){var e=[];if(JSON.parse(localStorage.getItem("keyboard")))return e=JSON.parse(localStorage.getItem("keyboard")).letters,e;for(i.forEach(n=>{e.includes(n)||e.push(n)});e.length<26;){var t=f[Math.floor(Math.random()*f.length)];if(t.filter(s=>i.includes(s)).length!=0){for(var a in t)if(!e.includes(t[a]))if(e.length<26)e.push(t[a]);else break}}let o=e.map(n=>({value:n,sort:Math.random()})).sort((n,s)=>n.sort-s.sort).map(({value:n})=>n);for(var r=[],a=0;a<26;a++)r.push(null);return localStorage.setItem("keyboard",JSON.stringify({letters:o,state:r})),o}function K(){v(),setTimeout(()=>{document.querySelector(".helper").style.opacity=1},10),document.querySelector(".helper").style.display="flex"}function P(){document.querySelector(".helper").style.opacity=0,setTimeout(()=>{document.querySelector(".helper").style.display="none"},500),JSON.parse(localStorage.getItem("tamilWordle")).status!=="Win"&&JSON.parse(localStorage.getItem("tamilWordle")).status!=="Lose"&&m()}function R(e){var t=document.getElementById("helper-trans-switch"),a=document.querySelector(".contentcontainer"),o=document.getElementById("howtoplay");a.style.opacity=0,o.style.opacity=0,setTimeout(()=>{t.checked?(a.innerHTML=ae,a.style.opacity=1,o.innerHTML="\u0BB5\u0BBF\u0BA4\u0BBF\u0BAE\u0BC1\u0BB1\u0BC8\u0B95\u0BB3\u0BCD",o.style.opacity=1):(a.innerHTML=N,a.style.opacity=1,o.innerHTML="How to play",o.style.opacity=1)},500)}function F(){v(),setTimeout(()=>{document.querySelector(".statistics").style.opacity=1},10),document.querySelector(".statistics").style.display="flex"}function Y(){document.querySelector(".statistics").style.opacity=0,setTimeout(()=>{document.querySelector(".statistics").style.display="none"},500),JSON.parse(localStorage.getItem("tamilWordle")).status!=="Win"&&JSON.parse(localStorage.getItem("tamilWordle")).status!=="Lose"&&m()}var l=e=>("0"+e).slice(-2);function U(){setInterval(()=>{var e=J(new Date).getTime(),t=new Date().getTime(),a=e-t,o=Math.floor(a%(1e3*60*60*24)/(1e3*60*60)),r=Math.floor(a%(1e3*60*60)/(1e3*60)),n=Math.floor(a%(1e3*60)/1e3);document.querySelector(".clock").innerHTML=l(o)+":"+l(r)+":"+l(n)},1e3)}async function V(){var e=JSON.parse(localStorage.getItem("tamilWordle")),t=JSON.parse(localStorage.getItem("tamilWordleStats")).lastWinTimeTaken,a=new Date,o=new Date(a.getFullYear(),0,0),r=a-o,n=1e3*60*60*24,s=Math.floor(r/n),M=e["data-states"],B=e.gameState;if(e.status==="Win")var S=B.filter(d=>d!=="").length;if(e.status==="Lose")var S="X";var c=`\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD Wordle ${s} ${S}/5 

Time Taken ${t}

`;if(M.forEach(d=>{d!=null&&d.forEach(q=>{switch(q){case"correct":c+="\u{1F7E2}";break;case"incorrect":c+="\u26AB";break;case"incorrect-location":c+="\u{1F7E1}";break}}),d!=null&&(c+=`
`)}),c+=`

Visit https://the-robin-hood.github.io/tamilwordle
`,navigator.share&&navigator.userAgentData.mobile)try{await navigator.share({text:c})}catch(d){console.log(d)}else navigator.clipboard.writeText(c),y("Copied to clipboard")}function X(e){var t="<div class='overlayloader'><div class='spinner'></div></div>",a=JSON.parse(localStorage.getItem("keyboard")).state;for(let o in e)t+=`<button class="${a[o]!=null?a[o]+" key":"key"}" data-key="${decodeURIComponent(e[o])}">${decodeURIComponent(e[o])}</button>`,(o==9||o==18)&&(t+="<div class='space'></div>"),o==18&&(t+='<button data-enter class="key special">Enter</button>');return t+=`<button data-delete aria-label='Delete Key' class="key special">
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
  </svg>
  </button>`,t}function I(e){if(e.target.matches("[data-key]")){L(e.target.dataset.key);return}if(e.target.matches("[data-enter]")){O();return}if(e.target.matches("[data-delete]")){E();return}}function T(e){if(e.key=="Backspace"){E();return}if(e.key=="Enter"){O();return}if(e.key.match(/^[a-z]$/)){L(u[te.indexOf(e.key.toLowerCase())]);return}}function L(e){if(g().length>3)return;var t=JSON.parse(localStorage.getItem("timer"));t||localStorage.setItem("timer",JSON.stringify(new Date().getTime()));const a=p.querySelector(":not([data-letter])");a.dataset.letter=e,a.textContent=e,a.dataset.state="active"}function E(){const e=g()[g().length-1];e!=null&&(e.textContent="",delete e.dataset.letter,delete e.dataset.state)}function Q(e,t,a,o){const r=e.dataset.letter,n=H.querySelector(`[data-key="${r}"]`);setTimeout(()=>{e.classList.add("reveal")},t*500/2),e.addEventListener("transitionend",()=>{const s=JSON.parse(localStorage.getItem("keyboard"));e.classList.remove("reveal"),i[t]===r?(e.dataset.state="correct",n.classList.add("correct"),s.state[u.indexOf(r)]="correct"):i.includes(r)?(e.dataset.state="incorrect-location",n.classList.add("incorrect-location"),s.state[u.indexOf(r)]="incorrect-location"):(e.dataset.state="incorrect",n.classList.add("incorrect"),s.state[u.indexOf(r)]="incorrect"),localStorage.setItem("keyboard",JSON.stringify(s)),t===i.length-1&&e.addEventListener("transitionend",()=>{m(),Z(o,a)},{once:!0})},{once:!0})}function x(e){const t=JSON.parse(localStorage.getItem("tamilWordleStats"));t.played++,e==="win"?(t.wins++,t.streak++):t.streak=0;var a=j({start:JSON.parse(localStorage.getItem("timer")),end:new Date().getTime()});a.hours>0?t.lastWinTimeTaken=l(a.hours)+":"+l(a.minutes)+":"+l(a.seconds):t.lastWinTimeTaken=l(a.minutes)+":"+l(a.seconds),document.getElementById("played").innerHTML=t.played,document.getElementById("wins").innerHTML=t.wins,document.getElementById("streaks").innerHTML=t.streak,document.getElementById("timetaken").innerHTML=t.lastWinTimeTaken,localStorage.setItem("tamilWordleStats",JSON.stringify(t)),localStorage.removeItem("timer")}function h(){document.querySelector(".statscontainer").style.display="flex",document.querySelector(".statsbottombar").style.display="flex",document.querySelector(".nostats").style.display="none"}function Z(e,t){var a=JSON.parse(localStorage.getItem("tamilWordle"));if(e.join("")===i.join("")){y("You Win!"),_(t),v(),a.status="Win",localStorage.setItem("tamilWordle",JSON.stringify(a)),x("win"),setTimeout(()=>{h(),document.getElementById("statistics").click()},1500);return}p.querySelectorAll(":not([data-letter])").length==0&&(y(i.join("")),a.status="Lose",v(),x("lose"),setTimeout(()=>{h(),document.getElementById("statistics").click()},1500)),localStorage.setItem("tamilWordle",JSON.stringify(a))}function _(e){e.forEach((t,a)=>{setTimeout(()=>{t.classList.add("winAnimate"),t.addEventListener("animationend",function(){t.classList.remove("winAnimate")},{once:!0})},a*500/5)})}function ee(e){var t=JSON.parse(localStorage.getItem("tamilWordle")),a=t.gameState.indexOf("");t.gameState[a]=e;var o=[];e.forEach((r,n)=>{i[n]===r?o.push("correct"):i.includes(r)?o.push("incorrect-location"):o.push("incorrect")}),t["data-states"][a]=o,t.status="Progress",localStorage.setItem("tamilWordle",JSON.stringify(t))}async function O(){var e=document.querySelector(".overlayloader");v();const t=[...g()];if(t.length!==4){y("Not enough letters"),b(t),m();return}else{var a=t.map(r=>r.dataset.letter);if(!W.includes(a.join(""))){e.style.display="flex";var o=await C(a.join(""));if(e.style.display="none",!o){y("Not in word list"),b(t),m();return}}ee(a),g().forEach((...r)=>{Q(...r,a)})}}function m(){document.addEventListener("click",I),document.addEventListener("keydown",T)}function v(){document.removeEventListener("click",I),document.removeEventListener("keydown",T)}function w(){localStorage.removeItem("tamilWordle"),localStorage.removeItem("keyboard");var e={gameState:["","","","",""],"data-states":[null,null,null,null,null],status:"Initiated",answer:i,expires:String(new Date).slice(0,15)};if(localStorage.setItem("tamilWordle",JSON.stringify(e)),!localStorage.getItem("tamilWordleStats")){var t={played:0,wins:0,streak:0,lastWinTimeTaken:0};localStorage.setItem("tamilWordleStats",JSON.stringify(t)),document.getElementById("played").innerHTML=t.played,document.getElementById("wins").innerHTML=t.wins,document.getElementById("streaks").innerHTML=t.streak}}async function k(e){return new Promise(t=>setTimeout(t,e))}var f=[],W=[],i,u;const te=["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"],N=`<p>
Guess the WORDLE in five tries. <br />
<br />
Each guess must be a valid four-letter tamil word.Hit the enter
button to submit.<br />
<br />
After each guess, the color of the tiles will change to show how
close your guess was to the word.
<div style="border-bottom: 1px solid #3a3a3c;  margin:10px;"></div>

<strong>Examples 
</strong> 
<div class="example"> 
<div class="box helperbox"  data-state="correct">\u0B9A\u0BBF</div>
<div class="box helperbox" >\u0B99\u0BCD</div>
<div class="box helperbox" >\u0B95</div>
<div class="box helperbox" >\u0BAE\u0BCD</div>
</div>

The letter <strong>\u0B9A\u0BBF</strong> is in the word and in the correct spot.

<div class="example"> 
<div class="box helperbox" >\u0BB5\u0BBF</div>
<div class="box helperbox" data-state="incorrect-location">\u0BB5</div>
<div class="box helperbox" >\u0B9A\u0BBE</div>
<div class="box helperbox" >\u0BAF\u0BBF</div>
</div>
The letter <strong>\u0BB5</strong> is in the word but in the wrong spot.

<div class="example"> 
<div class="box helperbox" >\u0B9A</div>
<div class="box helperbox" >\u0B9F\u0BCD </div>
<div class="box helperbox" data-state="incorrect" >\u0B9F</div>
<div class="box helperbox" >\u0BAE\u0BCD</div>
</div>

The letter \u0B9F  is not in the word in any spot. 
<div style="border-bottom: 1px solid #3a3a3c; margin:10px;"></div>

<strong>
A new WORDLE will be available each day!
</strong>
</p>`,ae=`
<p>
\u0B90\u0BA8\u0BCD\u0BA4\u0BC1 \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0BAF\u0BBF\u0BB2\u0BCD \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BC8\u0B95\u0BCD \u0B95\u0BA3\u0BCD\u0B9F\u0BC1\u0BAA\u0BBF\u0B9F\u0BBF\u0BAF\u0BC1\u0B99\u0BCD\u0B95\u0BB3\u0BCD. <br />
          <br />
          \u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0B85\u0BA9\u0BC1\u0BAE\u0BBE\u0BA9\u0BAE\u0BC1\u0BAE\u0BCD \u0BA8\u0BBE\u0BA9\u0BCD\u0B95\u0BC1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD \u0B95\u0BCA\u0BA3\u0BCD\u0B9F \u0B92\u0BB0\u0BC1 \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBE\u0B95\u0BC1\u0BAE\u0BCD.<br />
          <br />
          \u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0BAE\u0BC1\u0BAF\u0BB1\u0BCD\u0B9A\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0BAA\u0BCD \u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BC1\u0BAE\u0BCD, \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0B95\u0B9F\u0BCD\u0B9F\u0B99\u0BCD\u0B95\u0BB3\u0BBF\u0BA9\u0BCD \u0BB5\u0BA3\u0BCD\u0BA3\u0B99\u0BCD\u0B95\u0BB3\u0BCD, \u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BC1 \u0B8F\u0BB1\u0BCD\u0BB1\u0BB5\u0BBE\u0BB1\u0BC1 \u0BAE\u0BBE\u0BB1\u0BC1\u0BAE\u0BCD.
          <div style="border-bottom: 1px solid #3a3a3c;  margin:10px;"></div>
          
          <strong>\u0B89\u0BA4\u0BBE\u0BB0\u0BA3\u0BAE\u0BBE\u0B95 
          </strong> 
          <div class="example"> 
            <div class="box helperbox"  data-state="correct">\u0B9A\u0BBF</div>
            <div class="box helperbox" >\u0B99\u0BCD</div>
            <div class="box helperbox" >\u0B95</div>
            <div class="box helperbox" >\u0BAE\u0BCD</div>
          </div>
            
          <strong>\u0B9A\u0BBF</strong> \u0B8E\u0BA9\u0BCD\u0BB1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1, \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0BAE\u0BBF\u0B95\u0B9A\u0BCD\u0B9A\u0BB0\u0BBF\u0BAF\u0BBE\u0BA9 \u0B87\u0B9F\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.
        
          <div class="example"> 
            <div class="box helperbox" >\u0BB5\u0BBF</div>
            <div class="box helperbox" data-state="incorrect-location">\u0BB5</div>
            <div class="box helperbox" >\u0B9A\u0BBE</div>
            <div class="box helperbox" >\u0BAF\u0BBF</div>
          </div>
          <strong>\u0BB5</strong> \u0B8E\u0BA9\u0BCD\u0BB1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1; \u0B86\u0BA9\u0BBE\u0BB2\u0BCD, \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B87\u0B9F\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BBF\u0BB1\u0BA4\u0BC1.

          <div class="example"> 
            <div class="box helperbox" >\u0B9A</div>
            <div class="box helperbox" >\u0B9F\u0BCD </div>
            <div class="box helperbox" data-state="incorrect" >\u0B9F</div>
            <div class="box helperbox" >\u0BAE\u0BCD</div>
          </div>
          
          <strong>\u0B9F</strong> \u0B8E\u0BA9\u0BCD\u0BB1 \u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1 \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8\u0BAF\u0BBF\u0BB2\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8. 
          <div style="border-bottom: 1px solid #3a3a3c; margin:10px;"></div>

          <strong>
          \u0B92\u0BB5\u0BCD\u0BB5\u0BCA\u0BB0\u0BC1 \u0BA8\u0BBE\u0BB3\u0BC1\u0BAE\u0BCD \u0B92\u0BB0\u0BC1 \u0BAA\u0BC1\u0BA4\u0BBF\u0BAF \u0BB5\u0BBE\u0BB0\u0BCD\u0BA4\u0BCD\u0BA4\u0BC8 \u0B95\u0BBF\u0B9F\u0BC8\u0B95\u0BCD\u0B95\u0BC1\u0BAE\u0BCD..!
          </strong>
        </p>
`,g=()=>p.querySelectorAll('[data-state="active"]'),H=document.querySelector(".keyboard"),p=document.querySelector(".gamegrid");async function re(){if(await $(),i=z(),document.getElementById("helperButton").onclick=K,document.getElementById("hideHelper").onclick=P,document.querySelector(".contentcontainer").innerHTML=N,document.getElementById("helper-trans-switch").onclick=R,document.getElementById("statistics").onclick=F,document.getElementById("hideStatistics").onclick=Y,document.querySelector(".share").onclick=V,localStorage.getItem("tamilWordle")){var e=JSON.parse(localStorage.getItem("tamilWordle"));if(e.expires!==String(new Date).slice(0,15))w(),m();else{var t=JSON.parse(localStorage.getItem("tamilWordleStats"));document.getElementById("played").innerHTML=t.played,document.getElementById("wins").innerHTML=t.wins,document.getElementById("streaks").innerHTML=t.streak,document.getElementById("timetaken").innerHTML=t.lastWinTimeTaken,e.gameState.forEach(async(a,o)=>{e.gameState[o]!==""&&e.gameState[o].forEach(async(r,n)=>{var s=p.querySelector(":not([data-letter])");s.dataset.letter=r,await k(100*(n+1)),s.classList.add("reveal"),await k(200*(n+1)),s.dataset.state=e["data-states"][o][n],s.innerHTML=r,s.classList.remove("reveal")})}),(e.status==="Progress"||e.status==="Initiated")&&(console.log("Game Initiated"),m()),(e.status==="Win"||e.status==="Lose")&&setTimeout(()=>{document.getElementById("statistics").click()},1500)}}else document.getElementById("helperButton").click(),w();u=G(),H.innerHTML=X(u),U(),JSON.parse(localStorage.getItem("tamilWordleStats")).played===0?(document.querySelector(".statscontainer").style.display="none",document.querySelector(".statsbottombar").style.display="none",document.querySelector(".nostats").style.display="flex"):h()}re();
