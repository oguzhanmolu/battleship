import PlayPhase from './playPhase';
import Ship from './ship';
export default class conclusionPhase {
  constructor() {
    this.isGameFinished = false;
  }

  // Return true if either one of the players has no ship left on game board
  static checkIsGameFinished() {
    const playerRemainingShips = Ship.getPlayerShips().filter(
      (ship) => ship.isSunk === false
    ).length;
    const computerRemainingShips = Ship.getComputerShips().filter(
      (ship) => ship.isSunk === false
    ).length;

    // If player is the winner
    if (computerRemainingShips === 0) {
      // Announce player as the winner
      PlayPhase.updateAnnouncementText('PLAYER HAS WON!', 'black');
      this.isGameFinished = true;
    }

    // If computer is the winner
    else if (playerRemainingShips === 0) {
      const computerGameBoard = document.getElementById('computer-game-board');
      const computerShipArray = Ship.getComputerShips();
      const computerShipCoordinates = computerShipArray.flatMap(
        (ship) => ship.coordinates
      );

      // Highlight computer ships
      computerShipCoordinates.forEach((coordinate) => {
        computerGameBoard.childNodes[coordinate].style.backgroundColor =
          'black';
        computerGameBoard.childNodes[coordinate].style.color = 'white';
        computerGameBoard.childNodes[coordinate].textContent = coordinate;
      });
      PlayPhase.updateAnnouncementText('COMPUTER HAS WON!', 'black');
      this.isGameFinished = true;
    }
  }
}
