import GameBoard from './gameboard';
import Ship from './ship';

export default class PlayPhase {
  // Create computer game board
  static createComputerGameBoard() {
    const computerGameBoard = document.getElementById('computer-game-board');
    computerGameBoard.classList.add('game-board');
    GameBoard.createGameBoard(computerGameBoard);

    for (let i = 0; i < 100; i++) {
      computerGameBoard.childNodes[i].textContent = '';
    }
  }

  // Deploy computer ships randomly
  static deployComputerShips() {
    const computerGameBoard = document.getElementById('computer-game-board');
    const computerShipArray = Ship.getComputerShips();
    GameBoard.deployShipsRandomly(computerGameBoard, computerShipArray, false);
  }

  // Check if computer ship was hit
  static isShipHit() {
    const computerGameBoard = document.getElementById('computer-game-board');

    computerGameBoard.childNodes.forEach((grid) =>
      grid.addEventListener('click', (e) => {
        const targetIndex = Number(e.target.id);
        const computerShipArray = Ship.getComputerShips();
        const computerShipCoordinates = computerShipArray.flatMap(
          (ship) => ship.coordinates
        );

        // Return on multiple click on same grid
        if (grid.style.backgroundColor !== 'white') return;

        // Update remaining ship text with each click
        this.updateShipCount();
        // If there is a hit, mutate hit coordinate from array and 'ship.health--'
        if (computerShipCoordinates.includes(targetIndex)) {
          const hitShip = computerShipArray.find((ship) =>
            ship.coordinates.includes(targetIndex)
          );
          const hitCoordinateIndex = hitShip.coordinates.indexOf(targetIndex);
          hitShip.coordinates.splice(
            hitCoordinateIndex,
            hitCoordinateIndex + 1
          );
          hitShip.health--;
          console.log(hitShip);

          // Insert CSS magic here
          this.highlightHitGrid(computerGameBoard, targetIndex, true);
          this.updateHitInfoText('HIT!', 'red');
        } else {
          // Insert CSS magic here
          this.highlightHitGrid(computerGameBoard, targetIndex, false);
          this.updateHitInfoText('MISS!', '#2B65EC');
        }
      })
    );
  }
  // Update ship count
  static updateShipCount() {
    const textPlayerShipCount = document.querySelector(
      '.player-remaining-ships'
    );
    const textComputerShipCount = document.querySelector(
      '.computer-remaining-ships'
    );
    const playerRemainingShips = Ship.getPlayerShips().length;
    const computerRemainingShips = Ship.getComputerShips().length;
    textPlayerShipCount.textContent = `${playerRemainingShips} SHIPS LEFT`;
    textComputerShipCount.textContent = `${computerRemainingShips} SHIPS LEFT`;
  }

  // Highlight clicked grids in PlayPhase
  static highlightHitGrid(parent, currentGridIndex, isHit) {
    const clickedGrid = parent.childNodes[currentGridIndex];

    // When there is a hit
    if (isHit === true) {
      clickedGrid.style.backgroundColor = 'red';
      clickedGrid.textContent = 'x';
    }
    // When there is not
    else clickedGrid.style.backgroundColor = '#2B65EC';
  }
  //
  static updateHitInfoText(text, color) {
    const hitInfoText = document.getElementById('hit-info-text');
    hitInfoText.style.display = 'block';
    hitInfoText.textContent = text;
    hitInfoText.style.color = color;
  }
}
