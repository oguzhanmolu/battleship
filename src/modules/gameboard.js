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

      parent.appendChild(grid);
    }
  }

  // Returns true if ship is deployable to the current grid
  static isShipDeployable(parent, currentGrid, shipLength, rotation) {
    const shipFurthestLocation = currentGrid + shipLength - 1;
    const indexArr = Ship.setShipCoordinates(currentGrid, shipLength, rotation);

    // Returns false if ship is not deployable to current grid. Or else, returns true as default
    if (
      indexArr.some(
        (index) =>
          index > 99 ||
          parent.childNodes[index].style.backgroundColor === 'black'
      ) ||
      (rotation === 'horizontal' &&
        currentGrid < 10 &&
        currentGrid.toString().length !==
          shipFurthestLocation.toString().length) ||
      (rotation === 'horizontal' &&
        currentGrid > 9 &&
        currentGrid.toString().split('')[0] !==
          shipFurthestLocation.toString().split('')[0])
    )
      return false;

    return true;
  }

  // Change grid colors from ship coordinates
  static setGridColor(
    parent,
    currentGrid,
    shipLength,
    rotation,
    backgroundColor,
    textColor
  ) {
    const currentShip = Ship.setShipCoordinates(
      currentGrid,
      shipLength,
      rotation
    );

    currentShip.forEach((shipIndex) => {
      parent.childNodes[shipIndex].style.background = backgroundColor;
      if (textColor) parent.childNodes[shipIndex].style.color = textColor;
    });
  }

  // Deploy ships randomly
  static deployShipsRandomly(parent, shipArray) {
    shipArray.forEach((ship) => {
      while (ship.isDeployed === false) {
        let randomIndex = Math.floor(Math.random() * 101);
        let randomRotation =
          Math.floor(Math.random() * 2) === 0 ? 'vertical' : 'horizontal';

        if (
          GameBoard.isShipDeployable(
            parent,
            randomIndex,
            ship.length,
            randomRotation
          )
        ) {
          this.setGridColor(
            parent,
            randomIndex,
            ship.length,
            randomRotation,
            'black',
            'white'
          );
          ship.isDeployed = true;
          ship.coordinates = Ship.setShipCoordinates(
            randomIndex,
            ship.length,
            randomRotation
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
    computerMain.style.flexDirection = 'column';
    modalShipInfoGroup.style.display = 'none';
    btnRotate.style.display = 'none';
    btnRandomDeploy.style.display = 'none';
  }
}
