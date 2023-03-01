export default class Gameboard {
  // Create 10x10 game board
  static createGameBoard() {
    const modal = document.getElementById('modal');
    const gameBoard = document.createElement('div');
    gameBoard.classList.add('game-board');

    for (let i = 0; i < 100; i++) {
      const grid = document.createElement('div');
      grid.classList.add('grid');
      grid.textContent = i;
      gameBoard.appendChild(grid);
    }

    modal.appendChild(gameBoard);
  }

  static positionBattleships() {
    const gridAll = document.querySelectorAll('.grid');

    gridAll.forEach((singleGrid) =>
      singleGrid.addEventListener('click', () => {
        console.log(singleGrid.textContent);
      })
    );
  }
}
