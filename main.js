(()=>{"use strict";class t{static createModalGameBoard(){const t=document.getElementById("modal-game-board");t.classList.add("game-board");for(let e=0;e<100;e++){const o=document.createElement("div");o.classList.add("grid"),o.textContent=e,t.appendChild(o)}}static isHorizontallyDeployable(t,e){const o=t+e-1;return t<10&&t.length===o.toString().length||t.split("")[0]===o.toString().split("")[0]}static isVerticallyDeployable=(t,e)=>t+10*e<=99;static hoverEffects(t,e){const o=document.querySelectorAll(".grid"),a=document.getElementById("modal-game-board");o.forEach((o=>{o.addEventListener("mouseover",(()=>{const l=Number(o.textContent);for(let r=1;r<t;r++){let t;t="horizontal"===e?l+r:l+10*r,o.style.backgroundColor="rgba(0,0,0,.5)",a.childNodes[t].style.backgroundColor="rgba(0,0,0,.5)"}})),o.addEventListener("mouseout",(()=>{}))}))}}t.createModalGameBoard(),t.hoverEffects(5,"vertical")})();