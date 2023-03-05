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

  // HIGHLIGHT ON HOVER
  static highlightGridOnHover(shipLength, rotation) {
    const gridAll = document.querySelectorAll('.grid');
    const modalGameBoard = document.getElementById('modal-game-board');

    // Checks current grid length and ship length&rotation,
    // And returns 'true' if deployment is legit.
    // This look horrible, gonna edit it later.
    function isShipDeployable(currentGrid, shipLength) {
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

    // Loop ship length and add hover effects on grids.
    // Set next grid's length according to rotation.
    // 10 for vertical, 1 for horizontal.
    function setGridColor(currentGrid, shipLength, color) {
      for (let i = 1; i < shipLength; i++) {
        let nextGrid;
        rotation === 'horizontal'
          ? (nextGrid = currentGrid + i)
          : (nextGrid = currentGrid + i * 10);

        modalGameBoard.childNodes[currentGrid].style.backgroundColor = color;
        modalGameBoard.childNodes[nextGrid].style.backgroundColor = color;
      }
    }

    // Highlight current grid on 'mouseover'
    gridAll.forEach((singleGrid) => {
      singleGrid.addEventListener('mouseover', () => {
        const currentGridLength = Number(singleGrid.textContent);

        // If ship is deployable to the current grid, highlight it.
        if (!isShipDeployable(currentGridLength, shipLength)) return;
        setGridColor(currentGridLength, shipLength, 'rgba(0,0,0,.5)');
      });

      // Cancel highlight when 'mouseout'
      singleGrid.addEventListener('mouseout', () => {
        const currentGridLength = Number(singleGrid.textContent);
        // Check if ship deployment is legit, before trying to cancel the hover effect.
        if (isShipDeployable(currentGridLength, shipLength))
          setGridColor(currentGridLength, shipLength, 'white');
      });
    });
  }
}
