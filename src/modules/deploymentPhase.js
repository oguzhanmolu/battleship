import GameBoard from './gameboard';

export default class ModalGameBoard {
  // Create 10x10 game board
  static createModalGameBoard() {
    const modalGameBoard = document.getElementById('modal-game-board');
    modalGameBoard.classList.add('game-board');
    GameBoard.createGameBoard(modalGameBoard);
  }

  static deployShip(shipLength, rotation) {
    ModalGameBoard.gridMouseActions(4, 'horizontal');

    //
  }

  // Switch ship rotation on 'r' keydown
  static switchShipRotation() {
    const rotateButton = document.getElementById('rotate-button');
    rotateButton.addEventListener('click', () => {
      // Rotate
    });
  }

  // Loop ship length and add hover effects on grids.
  // Set next grid's length according to rotation.
  // 10 for vertical, 1 for horizontal.
  static setGridColor(currentGrid, shipLength, rotation, color) {
    const modalGameBoard = document.getElementById('modal-game-board');

    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGrid + i)
        : (nextGrid = currentGrid + i * 10);

      modalGameBoard.childNodes[currentGrid].style.backgroundColor = color;
      modalGameBoard.childNodes[nextGrid].style.backgroundColor = color;
    }
  }

  // Highlight on hover
  static gridMouseActions(shipLength, rotation) {
    const gridAll = document.querySelectorAll('.grid');

    // Highlight current grid on 'mouseover'
    gridAll.forEach((singleGrid) => {
      singleGrid.addEventListener('mouseover', () => {
        const currentGridLength = Number(singleGrid.textContent);

        // If ship is deployable to the current grid, highlight it.
        if (GameBoard.isShipDeployable(currentGridLength, shipLength, rotation))
          this.setGridColor(
            currentGridLength,
            shipLength,
            rotation,
            'rgba(0,0,0,.5)'
          );
      });
    });

    // Cancel highlight when 'mouseout'
    gridAll.forEach((singleGrid) =>
      singleGrid.addEventListener('mouseout', () => {
        const currentGridLength = Number(singleGrid.textContent);
        // Check if ship deployment is legit, before trying to cancel the hover effect.
        if (GameBoard.isShipDeployable(currentGridLength, shipLength, rotation))
          this.setGridColor(currentGridLength, shipLength, rotation, 'white');
      })
    );

    // Deploy ship on click
    gridAll.forEach((singleGrid) =>
      singleGrid.addEventListener('click', () => {
        const currentGridLength = Number(singleGrid.textContent);

        // If ship is deployable to the current grid, highlight it.

        if (GameBoard.isShipDeployable(currentGridLength, shipLength, rotation))
          this.setGridColor(currentGridLength, shipLength, rotation, 'orange');
      })
    );
  }
}
