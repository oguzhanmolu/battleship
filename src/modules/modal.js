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

  static hoverEffects() {
    const gridAll = document.querySelectorAll('.grid');

    gridAll.forEach((singleGrid) => {
      singleGrid.addEventListener('mouseover', () => {
        singleGrid.style.backgroundColor = 'rgba(0,0,0,.5)';
      });

      singleGrid.addEventListener(
        'mouseout',
        () => (singleGrid.style.backgroundColor = 'white')
      );
    });
  }
}
