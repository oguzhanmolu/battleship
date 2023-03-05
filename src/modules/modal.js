export default class Modal {
  // Create 10x10 game board
  static createModalGameBoard() {
    const modalGameBoard = document.getElementById('modal-game-board');
    modalGameBoard.classList.add('game-board');

    for (let i = 0; i < 100; i++) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.textContent = i;
      modalGameBoard.appendChild(grid);
    }
  }

  // Returns 'true' if ship is horizontally deployable
  // Checks current grid length and deployed ship grid length
  // and make sure both are in the same row.
  static isHorizontallyDeployable(currentGrid, shipLength) {
    const shipFurthestLocation = currentGrid + shipLength - 1;
    return (
      (currentGrid < 10 &&
        currentGrid.toString().length ===
          shipFurthestLocation.toString().length) ||
      currentGrid.toString().split('')[0] ===
        shipFurthestLocation.toString().split('')[0]
    );
  }

  // Returns 'true' if ship is vertically deployable.
  // Simply checks length of grid and ship length.
  static isVerticallyDeployable = (currentGrid, shipLength) =>
    currentGrid + shipLength * 10 <= 99;

  // Rotate ship vertically/horizontally in deployment phase.
  static rotateDeployment() {}

  static highlightGridOnHover(shipLength, rotation) {
    const gridAll = document.querySelectorAll('.grid');
    const modalGameBoard = document.getElementById('modal-game-board');

    function setGridColor(currentGrid, shipLength, color) {
      // Loop ship length and add hover effects on grids.
      for (let i = 1; i < shipLength; i++) {
        // Set next grid's length according to rotation.
        // 10 for vertical, 1 for horizontal.
        let nextGrid;
        rotation === 'horizontal'
          ? (nextGrid = currentGrid + i)
          : (nextGrid = currentGrid + i * 10);

        modalGameBoard.childNodes[currentGrid].style.backgroundColor = color;
        modalGameBoard.childNodes[nextGrid].style.backgroundColor = color;
      }
    }

    gridAll.forEach((singleGrid) => {
      singleGrid.addEventListener('mouseover', () => {
        const currentGridLength = Number(singleGrid.textContent);

        // If ship is not deployable to the current grid, return and
        // don't show the illegal hover effect.
        if (
          (rotation === 'horizontal' &&
            !this.isHorizontallyDeployable(currentGridLength, shipLength)) ||
          (rotation === 'vertical' &&
            !this.isVerticallyDeployable(currentGridLength, shipLength - 1))
        )
          return;

        // If, ship is deployable to the current grid,
        // then highlight it.
        setGridColor(currentGridLength, shipLength, 'rgba(0,0,0,.5)');
      });

      // Cancel highlight on hovered grids.
      singleGrid.addEventListener('mouseout', () => {
        const currentGridLength = Number(singleGrid.textContent);
        setGridColor(currentGridLength, shipLength, 'white');
      });
    });
  }
}
