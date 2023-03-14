import GameBoard from './gameboard';
import Ship from './ship';
import conclusionPhase from './conclusionPhase';

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

    GameBoard.deployShipsRandomly(computerGameBoard, computerShipArray, false);
  }

  // Check if clicked grid is ship or not.
  static checkIsHit(target, shipArray, shipCoordinates, gameBoard, isPlayer) {
    // If there is a hit, get hit ship variable.
    if (shipCoordinates.includes(target)) {
      const hitShip = shipArray.find((ship) =>
        ship.coordinates.includes(target)
      );

      // Mutate hit coordinates from hitShip.coordinates
      hitShip.coordinates.splice(hitShip.coordinates.indexOf(target), 1);

      // ship.health--/set isSunk
      hitShip.health--;
      if (hitShip.health === 0) hitShip.isSunk = true;

      // Highlight grid/Update hit info text (text is for player only)
      this.highlightHitGrid(gameBoard, target, true);
      if (isPlayer) this.updateAnnouncementText('HIT!', 'red');
    }

    // If there isn't a hit
    else {
      this.highlightHitGrid(gameBoard, target, false);
      if (isPlayer) this.updateAnnouncementText('MISS!', '#2B65EC');
    }
  }

  // Bombard game fields after clicking on the game board
  static bombardGameFieldOnClick() {
    const computerGameBoard = document.getElementById('computer-game-board');
    const playerGameBoard = document.getElementById('player-game-board');
    let gameBoardGridIndexes = [];
    for (let i = 0; i < 100; i++) gameBoardGridIndexes.push(i);

    computerGameBoard.childNodes.forEach((grid) =>
      grid.addEventListener('click', (e) => {
        // If there is any multiple clicks on the same grid, or if game has already ended => Return
        if (
          grid.style.backgroundColor !== 'white' ||
          conclusionPhase.isGameFinished
        )
          return;

        // Handle player targets
        const playerTargetIndex = Number(e.target.id);
        const computerShipArray = Ship.getComputerShips();
        const computerShipCoordinates = computerShipArray.flatMap(
          (ship) => ship.coordinates
        );

        // If any shit was hit, change grid color, ship.health-- and mutate if ship.health===0
        this.checkIsHit(
          playerTargetIndex,
          computerShipArray,
          computerShipCoordinates,
          computerGameBoard,
          true
        );

        //////////////////////////////////////////////////////////////////////////////////////

        // Handle computer targets
        const playerShipArray = Ship.getPlayerShips();
        const playerShipCoordinates = playerShipArray.flatMap(
          (ship) => ship.coordinates
        );
        const computerTargetIndex =
          gameBoardGridIndexes[
            Math.floor(Math.random() * gameBoardGridIndexes.length)
          ];
        gameBoardGridIndexes.splice(
          gameBoardGridIndexes.indexOf(computerTargetIndex),
          1
        );

        // If any shit was hit, change grid color, ship.health-- and mutate if ship.health===0
        this.checkIsHit(
          computerTargetIndex,
          playerShipArray,
          playerShipCoordinates,
          playerGameBoard,
          false
        );

        ///////////////////////

        // Update remaining ship text after each bombardment
        this.updateShipCount();

        // If game is finished  set =>Ship.isGameFinished = true;
        conclusionPhase.checkIsGameFinished();
      })
    );
  }

  // Update ship count
  static updateShipCount() {
    const textPlayerShipCount = document.querySelector(
      '.player-remaining-ships'
    );
    const textComputerShipCount = document.querySelector(
      '.computer-remaining-ships'
    );
    const playerRemainingShips = Ship.getPlayerShips().filter(
      (ship) => ship.isSunk === false
    ).length;
    const computerRemainingShips = Ship.getComputerShips().filter(
      (ship) => ship.isSunk === false
    ).length;
    textPlayerShipCount.textContent = `${playerRemainingShips} SHIPS LEFT`;
    textComputerShipCount.textContent = `${computerRemainingShips} SHIPS LEFT`;
  }

  // Highlight bombarded grids in PlayPhase
  static highlightHitGrid(parent, currentGridIndex, isHit) {
    const currentGrid = parent.childNodes[currentGridIndex];

    // When there is a hit
    if (isHit === true) {
      currentGrid.style.backgroundColor = 'red';
      currentGrid.textContent = currentGridIndex;
    }
    // When there is not
    else currentGrid.style.backgroundColor = '#2B65EC';
  }

  // Update announcement text
  static updateAnnouncementText(text, color) {
    const hitInfoText = document.getElementById('hit-info-text');
    hitInfoText.style.display = 'block';
    hitInfoText.textContent = text;
    hitInfoText.style.color = color;
  }
}
