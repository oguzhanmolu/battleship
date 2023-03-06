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
  // And returns 'true' if deployment is legit.
  // This look horrible, gonna edit it later.
  static isShipDeployable(currentGrid, shipLength, rotation) {
    const shipFurthestLocation = currentGrid + shipLength - 1;
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
