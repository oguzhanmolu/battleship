import Ship from './ship';
import DeploymentPhase from './deploymentPhase';
const computerShipArray = Ship.createShipArray();

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

  // Deploy computer's ships
  static deployShipsRandomly(parent, shipArray) {
    // Deploy  computer ships randomly
    while (shipArray.length > 0) {
      let randomIndex = Math.floor(Math.random() * 101);
      let randomRotation =
        Math.floor(Math.random() * 2) === 0 ? 'vertical' : 'horizontal';

      if (
        GameBoard.isShipDeployable(
          parent,
          randomIndex,
          shipArray[0].length,
          randomRotation
        )
      ) {
        DeploymentPhase.setGridColor(
          parent,
          randomIndex,
          shipArray[0].length,
          randomRotation,
          'black',
          'white'
        );
        shipArray.shift();
      }
    }
  }

  // Returns true if ship is deployable to the current grid
  static isShipDeployable(parent, currentGrid, shipLength, rotation) {
    const shipFurthestLocation = currentGrid + shipLength - 1;

    let indexArr = [currentGrid];
    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGrid + i)
        : (nextGrid = currentGrid + i * 10);
      indexArr.push(nextGrid);
    }

    // Returns false if any grid is same as ship color or,
    // Grid index is > 99
    if (
      indexArr.some(
        (index) =>
          index > 99 ||
          parent.childNodes[index].style.backgroundColor === 'black'
      ) ||
      // Returns false if  ship is not deployable horizontally
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

    // If not, return true as default
    return true;
  }
  static changeToPlayPhase() {
    const modalShipInfoGroup = document.getElementById('modal-ship-info');
    const gameBoardTitle = document.querySelectorAll('.gameboard-title');
    const btnRotate = document.querySelector('.rotate-button');
    const btnRandomDeploy = document.querySelector('.random-deploy-button');
    const playerMain = document.getElementById('player-gameboard-main');
    const playerGameBoard = document.getElementById('player-game-board');
    const computerMain = document.getElementById('computer-gameboard-main');
    const computerGameBoard = document.getElementById('computer-game-board');

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

    // Deploy computer ships randomly
    GameBoard.deployShipsRandomly(computerGameBoard, computerShipArray);
  }
}
