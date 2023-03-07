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
      indexArr.push(nextGrid);
    }

    // Returns false if any grids are black color (meaning there is a ship there) or,
    // Grid index is > 99 which is higher than game board max index
    if (
      indexArr.some(
        (index) =>
          index > 99 ||
          modalGameBoard.childNodes[index].style.backgroundColor === 'orange'
      ) ||
      // Returns false if all of the ship's parts are not in the same row horizontally
      (rotation === 'horizontal' &&
        currentGrid < 10 &&
        currentGrid.toString().length !==
          shipFurthestLocation.toString().length) ||
      (rotation === 'horizontal' &&
        currentGrid > 9 &&
        currentGrid.toString().split('')[0] !==
          shipFurthestLocation.toString().split('')[0])
    )
      return false;

    // If not, return true as default
    return true;
  }
}
