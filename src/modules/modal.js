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

  static hoverEffects(shipLength, rotation) {
    const gridAll = document.querySelectorAll('.grid');
    const modalGameBoard = document.getElementById('modal-game-board');

    gridAll.forEach((singleGrid) => {
      singleGrid.addEventListener('mouseover', () => {
        const hoveredGridLength = Number(singleGrid.textContent);
        const shipMaxLength = hoveredGridLength + shipLength - 1;
        const hoveredGridString = singleGrid.textContent;
        const shipMaxLengthString = shipMaxLength.toString();
        if (
          hoveredGridString.length !== shipMaxLengthString.length ||
          (hoveredGridLength >= 10 &&
            hoveredGridString.split('')[0] !== shipMaxLengthString.split('')[0])
        )
          return;

        // Loop ship length and add hover effect for each grid
        for (let i = 1; i < shipLength; i++) {
          // Set next grid's length according to rotation
          let nextGrid;
          rotation === 'horizontal'
            ? (nextGrid = hoveredGridLength + i)
            : (nextGrid = hoveredGridLength + i * 10);

          if (nextGrid > 99 || nextGrid < 0) return;

          singleGrid.style.backgroundColor = 'rgba(0,0,0,.5)';
          modalGameBoard.childNodes[nextGrid].style.backgroundColor =
            'rgba(0,0,0,.5)';
        }
      });

      singleGrid.addEventListener('mouseout', () => {});
    });
  }
}
