(()=>{"use strict";class e{constructor(e,t){this.shipType=e,this.length=t,this.health=t,this.rotation="vertical",this.isDeployed=!1,this.isSunk=!1,this.coordinates=[],this.playerShips=[],this.computerShips=[]}static createShipArray(){return[new e("submarine",2),new e("destroyer",3),new e("destroyer",3),new e("cruiser",4),new e("carrier",5)]}static setPlayerShips(){return this.playerShips=this.createShipArray()}static getPlayerShips(){return this.playerShips}static getFirstDeployablePlayerShip(){return this.playerShips.filter((e=>!1===e.isDeployed))[0]}static setComputerShips(){return this.computerShips=this.createShipArray()}static getComputerShips(){return this.computerShips}static switchShipRotation(){const e=document.querySelector(".rotate-button"),t=this.getPlayerShips();e.addEventListener("click",(()=>{t.map((e=>"vertical"===e.rotation?e.rotation="horizontal":e.rotation="vertical"))}))}static setShipCoordinates(e,t,o){let i=[e];for(let r=1;r<t;r++){let t;t="horizontal"===o?e+r:e+10*r,i.push(t)}return i}}class t{static createGameBoard(e){for(let t=0;t<100;t++){const o=document.createElement("div");o.classList.add("grid"),o.setAttribute("id",`${t}`),o.textContent=t,o.style.backgroundColor="white",e.appendChild(o)}}static isShipDeployable(t,o,i,r){const a=o+i-1;return!(e.setShipCoordinates(o,i,r).some((e=>e>99||"black"===t.childNodes[e].style.backgroundColor))||"horizontal"===r&&o<10&&o.toString().length!==a.toString().length||"horizontal"===r&&o>9&&o.toString().split("")[0]!==a.toString().split("")[0])}static setGridColor(t,o,i,r,a,s){e.setShipCoordinates(o,i,r).forEach((e=>{t.childNodes[e].style.background=a,s&&(t.childNodes[e].style.color=s)}))}static deployShipsRandomly(o,i){i.forEach((i=>{for(;!1===i.isDeployed;){let r=Math.floor(101*Math.random()),a=0===Math.floor(2*Math.random())?"vertical":"horizontal";t.isShipDeployable(o,r,i.length,a)&&(i.isDeployed=!0,i.coordinates=e.setShipCoordinates(r,i.length,a))}}))}static changeToPlayPhase(){const e=document.getElementById("modal-ship-info"),t=document.querySelectorAll(".gameboard-title"),o=document.querySelector(".rotate-button"),i=document.querySelector(".random-deploy-button"),r=document.getElementById("player-gameboard-main"),a=document.getElementById("player-game-board"),s=document.getElementById("computer-gameboard-main"),l=document.querySelector(".player-remaining-ships");for(let e=0;e<100;e++)"black"!==a.childNodes[e].style.backgroundColor&&(a.childNodes[e].textContent="");t.forEach((e=>e.style.display="block")),r.style.transform="translate(-100%)",r.style.animation="slide-left 1s",s.style.display="flex",l.style.display="block",s.style.flexDirection="column",e.style.display="none",o.style.display="none",i.style.display="none"}}class o{static createPlayerGameBoard(){const e=document.getElementById("player-game-board");e.classList.add("game-board"),t.createGameBoard(e)}static setShipInfo(){const t=e.getFirstDeployablePlayerShip();let o=document.querySelector(".ship-info-text"),i=document.querySelector(".ship-img");t&&(o.textContent=t.shipType[0].toUpperCase()+t.shipType.slice(1),i.src=`/dist/img/${t.shipType}.png`,i.alt=`${t.shipType} image`)}static deployPlayerShipsRandomly(){const o=document.querySelector(".random-deploy-button"),i=document.getElementById("player-game-board"),r=e.getPlayerShips();o.addEventListener("click",(()=>{t.deployShipsRandomly(i,r)}))}static gridHoverEffects(){const o=document.querySelectorAll(".grid"),i=document.getElementById("player-game-board");o.forEach((o=>{o.addEventListener("mouseover",(()=>{const r=Number(o.id),a=e.getFirstDeployablePlayerShip();a&&t.isShipDeployable(i,r,a.length,a.rotation)&&t.setGridColor(i,r,a.length,a.rotation,"gray")}))})),o.forEach((o=>o.addEventListener("mouseout",(()=>{const r=Number(o.id),a=e.getFirstDeployablePlayerShip();a&&t.isShipDeployable(i,r,a.length,a.rotation)&&t.setGridColor(i,r,a.length,a.rotation,"white")}))))}static deployShip(){const o=document.querySelectorAll(".grid"),i=document.getElementById("player-game-board");o.forEach((o=>o.addEventListener("click",(()=>{const r=Number(o.id),a=e.getFirstDeployablePlayerShip();a&&t.isShipDeployable(i,r,a.length,a.rotation)&&(t.setGridColor(i,r,a.length,a.rotation,"black","white"),a.isDeployed=!0,a.coordinates=e.setShipCoordinates(r,a.length,a.rotation),this.setShipInfo())}))))}static endDeploymentPhase(){const o=document.querySelectorAll(".grid");document.querySelector(".random-deploy-button").addEventListener("click",(()=>t.changeToPlayPhase())),o.forEach((o=>o.addEventListener("click",(()=>{e.getFirstDeployablePlayerShip()||t.changeToPlayPhase()}))))}}class i{static createComputerGameBoard(){const e=document.getElementById("computer-game-board");e.classList.add("game-board"),t.createGameBoard(e);for(let t=0;t<100;t++)e.childNodes[t].textContent=""}static deployComputerShips(){const o=document.getElementById("computer-game-board"),i=e.getComputerShips();t.deployShipsRandomly(o,i)}static isShipHit(){const t=document.getElementById("computer-game-board");t.childNodes.forEach((o=>o.addEventListener("click",(i=>{const r=Number(i.target.id),a=e.getComputerShips(),s=a.flatMap((e=>e.coordinates));if("white"===o.style.backgroundColor)if(this.updateShipCount(),s.includes(r)){const e=a.find((e=>e.coordinates.includes(r))),o=e.coordinates.indexOf(r);e.coordinates.splice(o,o+1),e.health--,console.log(e),this.highlightHitGrid(t,r,!0),this.updateHitInfoText("HIT!","red")}else this.highlightHitGrid(t,r,!1),this.updateHitInfoText("MISS!","#2B65EC")}))))}static updateShipCount(){const t=document.querySelector(".player-remaining-ships"),o=document.querySelector(".computer-remaining-ships"),i=e.getPlayerShips().length,r=e.getComputerShips().length;t.textContent=`${i} SHIPS LEFT`,o.textContent=`${r} SHIPS LEFT`}static highlightHitGrid(e,t,o){const i=e.childNodes[t];!0===o?(i.style.backgroundColor="red",i.textContent="x"):i.style.backgroundColor="#2B65EC"}static updateHitInfoText(e,t){const o=document.getElementById("hit-info-text");o.style.display="block",o.textContent=e,o.style.color=t}}e.setPlayerShips(),e.setComputerShips(),e.switchShipRotation(),o.createPlayerGameBoard(),o.deployPlayerShipsRandomly(),o.gridHoverEffects(),o.deployShip(),o.endDeploymentPhase(),i.createComputerGameBoard(),i.deployComputerShips(),i.isShipHit()})();