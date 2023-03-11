import GameBoard from './gameboard';
import Ship from './ship';

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

  // Deploy computer ships randomly
  static deployComputerShips() {
    const computerGameBoard = document.getElementById('computer-game-board');
    const computerShipArray = Ship.getComputerShips();
    GameBoard.deployShipsRandomly(computerGameBoard, computerShipArray);
  }
}
