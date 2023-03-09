import GameBoard from './gameboard';

export default class PlayPhase {
  static createComputerGameBoard() {
    const computerGameBoard = document.getElementById('computer-game-board');
    computerGameBoard.classList.add('game-board');
    GameBoard.createGameBoard(computerGameBoard);
  }
}
