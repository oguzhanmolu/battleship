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
    GameBoard.deployShipsRandomly(computerGameBoard, computerShipArray);
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

        // Update remaining ship text with each click
        GameBoard.updateShipCount();
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
          GameBoard.highlightHitGrid(computerGameBoard, targetIndex, true);
        } else {
          // Insert CSS magic here
          GameBoard.highlightHitGrid(computerGameBoard, targetIndex, false);
        }
      })
    );
  }
}
