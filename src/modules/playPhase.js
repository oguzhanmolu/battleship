import GameBoard from './gameboard';

export default class PlayPhase {
  // Create computer game board
  static createComputerGameBoard() {
    const computerGameBoard = document.getElementById('computer-game-board');
    computerGameBoard.classList.add('game-board');
    GameBoard.createGameBoard(computerGameBoard);

    for (let i = 0; i < 100; i++) {
      computerGameBoard.childNodes[i].textContent = '';
    }
  }
  // Get player's ship coordinates
  static getPlayerCoordinates() {
    const gridAll = document.querySelectorAll('.grid');
    let shipCoordinates = [];

    gridAll.forEach((grid) => {
      if (grid.style.backgroundColor === 'black') shipCoordinates.push(grid.id);
    });
    return shipCoordinates;
  }
  // Deploy computer's ships
  static deployComputerShips() {
    const computerGameBoard = document.getElementById('computer-game-board');

    computerGameBoard.childNodes.forEach((child) =>
      child.addEventListener('click', () => {
        console.log(child.id);
      })
    );

    //
  }
}
