import ModalGameBoard from './deploymentPhase';

export default class GameBoard {
  // Create 10x10 game board and append on parent
  static createGameBoard(parent) {
    for (let i = 0; i < 100; i++) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.textContent = i;
      parent.appendChild(grid);
    }
  }

  // Returns true if ship is deployable to the current grid
  static isShipDeployable(currentGrid, shipLength, rotation) {
    const modalGameBoard = document.getElementById('modal-game-board');
    const shipFurthestLocation = currentGrid + shipLength - 1;

    let indexArr = [currentGrid];
    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGrid + i)
        : (nextGrid = currentGrid + i * 10);
      if (nextGrid > 99) return false;
      indexArr.push(nextGrid);
    }

    // Returns false if any grids are orange (meaning there is a ship there) or,
    // Grid index is > 99
    if (
      indexArr.some(
        (index) =>
          modalGameBoard.childNodes[index].style.backgroundColor === 'orange'
      )
    )
      return false;
    // Returns true if all of the ship's parts are in the same row horizontally
    return (
      (rotation === 'vertical' && currentGrid + shipLength * 10 - 10 <= 99) ||
      (rotation === 'horizontal' &&
        currentGrid < 10 &&
        currentGrid.toString().length ===
          shipFurthestLocation.toString().length) ||
      (rotation === 'horizontal' &&
        currentGrid.toString().split('')[0] ===
          shipFurthestLocation.toString().split('')[0])
    );
  }
}
