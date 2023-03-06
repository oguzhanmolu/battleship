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

  // Checks current grid length and ship length&rotation,
  // If any ship deployment grid is orange(means ship already exists) return,
  // If not, it means grid is available to deploy ship and hover effects are on.
  static isShipDeployable(currentGrid, shipLength, rotation) {
    const shipFurthestLocation = currentGrid + shipLength - 1;

    // Check if grids are next to each other and not in next row (means it's legit to deploy ship)
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
  static checkShipExistence(currentGrid, shipLength, rotation) {
    const modalGameBoard = document.getElementById('modal-game-board');
    let indexArr = [currentGrid];
    // Check if grid color ==='orange'
    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGrid + i)
        : (nextGrid = currentGrid + i * 10);
      if (nextGrid > 99) return false;
      indexArr.push(nextGrid);
    }

    return indexArr.every(
      (index) =>
        modalGameBoard.childNodes[index].style.backgroundColor !== 'orange'
    );
  }
}
