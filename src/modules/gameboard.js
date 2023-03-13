import Ship from './ship';
import DeploymentPhase from './deploymentPhase';

export default class GameBoard {
  // Create 10x10 game board and append on parent
  static createGameBoard(parent) {
    for (let i = 0; i < 100; i++) {
      const grid = document.createElement('div');

      grid.classList.add('grid');
      grid.setAttribute('id', `${i}`);
      grid.textContent = i;
      grid.style.backgroundColor = 'white';

      parent.appendChild(grid);
    }
  }

  // Returns true if ship is deployable to the current grid
  static isShipDeployable(shipArray, currentGridIndex, shipLength, rotation) {
    const shipFurthestLocation = currentGridIndex + shipLength - 1;
    const currentShipCoordinates = Ship.setShipCoordinates(
      currentGridIndex,
      shipLength,
      rotation
    );
    const deployedShipCoordinates = shipArray.flatMap(
      (ship) => ship.coordinates
    );

    // If there is a ship already in the same grids player is trying to deploy,
    // or grid index is not legit like >99
    if (
      currentShipCoordinates.some(
        (index) => index > 99 || deployedShipCoordinates.includes(index)
      ) ||
      // If ship is not in same row horizontally
      (rotation === 'horizontal' &&
        currentGridIndex < 10 &&
        currentGridIndex.toString().length !==
          shipFurthestLocation.toString().length) ||
      (rotation === 'horizontal' &&
        currentGridIndex > 9 &&
        currentGridIndex.toString().split('')[0] !==
          shipFurthestLocation.toString().split('')[0])
    )
      return false;

    return true;
  }

  // Set grid colors from current ship coordinates
  static setGridColor(
    parent,
    currentGridIndex,
    shipLength,
    rotation,
    backgroundColor,
    textColor
  ) {
    const currentShip = Ship.setShipCoordinates(
      currentGridIndex,
      shipLength,
      rotation
    );

    currentShip.forEach((shipIndex) => {
      parent.childNodes[shipIndex].style.background = backgroundColor;
      if (textColor) parent.childNodes[shipIndex].style.color = textColor;
    });
  }

  // Deploy ships randomly
  static deployShipsRandomly(parent, shipArray, isPlayer) {
    shipArray.forEach((ship) => {
      while (ship.isDeployed === false) {
        let randomIndex = Math.floor(Math.random() * 101);
        let randomRotation =
          Math.floor(Math.random() * 2) === 0 ? 'vertical' : 'horizontal';

        if (
          GameBoard.isShipDeployable(
            shipArray,
            randomIndex,
            ship.length,
            randomRotation
          )
        ) {
          ship.isDeployed = true;
          ship.coordinates = Ship.setShipCoordinates(
            randomIndex,
            ship.length,
            randomRotation
          );

          // If its player ships, show ships as well
          if (isPlayer === true)
            this.setGridColor(
              parent,
              randomIndex,
              ship.length,
              randomRotation,
              'black',
              'white'
            );
        }
      }
    });
  }

  // Change to play phase by hiding bunch of HTML elements
  static changeToPlayPhase() {
    const modalShipInfoGroup = document.getElementById('modal-ship-info');
    const gameBoardTitle = document.querySelectorAll('.gameboard-title');
    const btnRotate = document.querySelector('.rotate-button');
    const btnRandomDeploy = document.querySelector('.random-deploy-button');
    const playerMain = document.getElementById('player-gameboard-main');
    const playerGameBoard = document.getElementById('player-game-board');
    const computerMain = document.getElementById('computer-gameboard-main');
    const textPlayerShipCount = document.querySelector(
      '.player-remaining-ships'
    );

    // Highlight deployed grids
    for (let i = 0; i < 100; i++) {
      if (playerGameBoard.childNodes[i].style.backgroundColor !== `black`)
        playerGameBoard.childNodes[i].textContent = '';
    }

    // CSS changes
    gameBoardTitle.forEach((text) => (text.style.display = 'block'));
    playerMain.style.transform = 'translate(-100%)';
    playerMain.style.animation = 'slide-left 1s';
    computerMain.style.display = 'flex';
    textPlayerShipCount.style.display = 'block';
    computerMain.style.flexDirection = 'column';
    modalShipInfoGroup.style.display = 'none';
    btnRotate.style.display = 'none';
    btnRandomDeploy.style.display = 'none';
  }
}
