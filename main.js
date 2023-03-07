(()=>{"use strict";class t{static createGameBoard(t){for(let e=0;e<100;e++){const o=document.createElement("div");o.classList.add("grid"),o.textContent=e,t.appendChild(o)}}static isShipDeployable(t,e,o){const r=document.getElementById("modal-game-board"),a=t+e-1;let i=[t];for(let r=1;r<e;r++){let e;if(e="horizontal"===o?t+r:t+10*r,e>99)return!1;i.push(e)}return!i.some((t=>"orange"===r.childNodes[t].style.backgroundColor))&&("vertical"===o&&t+10*e-10<=99||"horizontal"===o&&t<10&&t.toString().length===a.toString().length||"horizontal"===o&&t.toString().split("")[0]===a.toString().split("")[0])}}class e{static createModalGameBoard(){const e=document.getElementById("modal-game-board");e.classList.add("game-board"),t.createGameBoard(e)}static deployShip(t,o){e.gridMouseActions(4,"vertical")}static switchShipRotation(){document.getElementById("rotate-button").addEventListener("click",(()=>{}))}static setGridColor(t,e,o,r){const a=document.getElementById("modal-game-board");for(let i=1;i<e;i++){let e;e="horizontal"===o?t+i:t+10*i,a.childNodes[t].style.backgroundColor=r,a.childNodes[e].style.backgroundColor=r}}static gridMouseActions(e,o){const r=document.querySelectorAll(".grid");r.forEach((r=>{r.addEventListener("mouseover",(()=>{const a=Number(r.textContent);t.isShipDeployable(a,e,o)&&this.setGridColor(a,e,o,"rgba(0,0,0,.5)")}))})),r.forEach((r=>r.addEventListener("mouseout",(()=>{const a=Number(r.textContent);t.isShipDeployable(a,e,o)&&this.setGridColor(a,e,o,"white")})))),r.forEach((r=>r.addEventListener("click",(()=>{const a=Number(r.textContent);t.isShipDeployable(a,e,o)&&this.setGridColor(a,e,o,"orange")}))))}}e.createModalGameBoard(),e.deployShip()})();