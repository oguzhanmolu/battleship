(()=>{"use strict";class t{static createGameBoard(t){for(let e=0;e<100;e++){const o=document.createElement("div");o.classList.add("grid"),o.textContent=e,t.appendChild(o)}}static isShipDeployable(t,e,o){const r=t+e-1;return"vertical"===o&&t+10*e-10<=99||"horizontal"===o&&t<10&&t.toString().length===r.toString().length||"horizontal"===o&&t.toString().split("")[0]===r.toString().split("")[0]}}class e{constructor(t){this.rotation="xd;"}static createModalGameBoard(){const e=document.getElementById("modal-game-board");e.classList.add("game-board"),t.createGameBoard(e)}static setShipRotation(){this.rotation="vertical"}static switchShipRotation(){document.getElementById("rotate-button").addEventListener("click",(()=>{console.log("test")}))}static setGridColor(t,e,o,r){const a=document.getElementById("modal-game-board");for(let i=1;i<e;i++){let e;e="horizontal"===o?t+i:t+10*i,"orange"!==a.childNodes[t].style.backgroundColor&&"orange"!==a.childNodes[e].style.backgroundColor&&(a.childNodes[t].style.backgroundColor=r,a.childNodes[e].style.backgroundColor=r)}}static gridHoverActions(e,o){const r=document.querySelectorAll(".grid");r.forEach((r=>{r.addEventListener("mouseover",(()=>{const a=Number(r.textContent);t.isShipDeployable(a,e,o)&&this.setGridColor(a,e,o,"rgba(0,0,0,.5)")})),r.addEventListener("mouseout",(()=>{const a=Number(r.textContent);t.isShipDeployable(a,e,o)&&this.setGridColor(a,e,o,"white")}))})),r.forEach((r=>r.addEventListener("click",(()=>{const a=Number(r.textContent);t.isShipDeployable(a,e,o)&&this.setGridColor(a,e,o,"orange")}))))}}e.createModalGameBoard(),e.gridHoverActions(2,"vertical")})();