(()=>{"use strict";class e{static createModalGameBoard(){const e=document.getElementById("modal-game-board");e.classList.add("game-board");for(let t=0;t<100;t++){const a=document.createElement("div");a.classList.add("grid"),a.textContent=t,e.appendChild(a)}}static hoverEffects(){document.querySelectorAll(".grid").forEach((e=>{e.addEventListener("mouseover",(()=>{e.style.backgroundColor="rgba(0,0,0,.5)"})),e.addEventListener("mouseout",(()=>e.style.backgroundColor="white"))}))}}e.createModalGameBoard(),e.hoverEffects()})();