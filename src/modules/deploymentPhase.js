import GameBoard from './gameboard';
import Ship from './ship';

export default class DeploymentPhase {
  // Create 10x10 player game board
  static createPlayerGameBoard() {
    const playerGameBoard = document.getElementById('player-game-board');
    playerGameBoard.classList.add('game-board');
    GameBoard.createGameBoard(playerGameBoard);
  }

  // Set next ship's text/img
  static setNextShipInfo() {
    const deployableShip = Ship.getFirstDeployablePlayerShip();
    let shipInfoText = document.querySelector('.ship-info-text');
    let shipImg = document.querySelector('.ship-img');

    if (!deployableShip) return;

    shipInfoText.textContent =
      deployableShip.shipType[0].toUpperCase() +
      deployableShip.shipType.slice(1);
    shipImg.src = `/img/${deployableShip.shipType}.png`;
    shipImg.alt = `${deployableShip.shipType} image`;
  }

  // Deploy undeployed player ships randomly, after random deploy button is clicked
  static deployPlayerShipsRandomly() {
    const btnRandomDeploy = document.querySelector('.random-deploy-button');
    const playerGameBoard = document.getElementById('player-game-board');
    const playerShipArray = Ship.getPlayerShips();

    btnRandomDeploy.addEventListener('click', () => {
      GameBoard.deployShipsRandomly(playerGameBoard, playerShipArray, true);
    });
  }

  //  Change grid colors on mouseover/mouseout
  static gridHoverEffects() {
    const gridAll = document.querySelectorAll('.grid');
    const playerGameBoard = document.getElementById('player-game-board');

    // Highlight current grid on 'mouseover'
    gridAll.forEach((grid) => {
      grid.addEventListener('mouseover', () => {
        const currentGridIndex = Number(grid.id);
        const deployableShip = Ship.getFirstDeployablePlayerShip();
        const playerShipArray = Ship.getPlayerShips();

        // Check if ship is deployable,
        if (
          deployableShip &&
          GameBoard.isShipDeployable(
            playerShipArray,
            currentGridIndex,
            deployableShip.length,
            deployableShip.rotation
          )
        )
          // Set color
          GameBoard.setGridColor(
            playerGameBoard,
            currentGridIndex,
            deployableShip.length,
            deployableShip.rotation,
            `gray`
          );
      });
    });

    // Cancel hover effect on 'mouseout'
    gridAll.forEach((grid) =>
      grid.addEventListener('mouseout', () => {
        const currentGridIndex = Number(grid.id);
        const deployableShip = Ship.getFirstDeployablePlayerShip();
        const playerShipArray = Ship.getPlayerShips();

        // Check if ship is deployable (if there is a ship, don't set color)
        if (
          deployableShip &&
          GameBoard.isShipDeployable(
            playerShipArray,
            currentGridIndex,
            deployableShip.length,
            deployableShip.rotation
          )
        )
          // Set color
          GameBoard.setGridColor(
            playerGameBoard,
            currentGridIndex,
            deployableShip.length,
            deployableShip.rotation,
            'white'
          );
      })
    );
  }

  // Deploy ship on click
  static deployShip() {
    const gridAll = document.querySelectorAll('.grid');
    const playerGameBoard = document.getElementById('player-game-board');
    const playerShipArray = Ship.getPlayerShips();

    gridAll.forEach((grid) =>
      grid.addEventListener('click', () => {
        const currentGridIndex = Number(grid.id);
        const deployableShip = Ship.getFirstDeployablePlayerShip();

        // Check if ship exists in same grids before deploying
        if (
          deployableShip &&
          GameBoard.isShipDeployable(
            playerShipArray,
            currentGridIndex,
            deployableShip.length,
            deployableShip.rotation
          )
        ) {
          // Set color
          GameBoard.setGridColor(
            playerGameBoard,
            currentGridIndex,
            deployableShip.length,
            deployableShip.rotation,
            'black',
            'white'
          );

          // Set ship isDeployed/coordinates on successful deployment
          deployableShip.isDeployed = true;
          deployableShip.coordinates = Ship.setShipCoordinates(
            currentGridIndex,
            deployableShip.length,
            deployableShip.rotation
          );

          // Set ship info/img
          this.setNextShipInfo();
        }
      })
    );
  }

  // End deployment phase/Start play phase when all of the ships are deployed.
  static endDeploymentPhase() {
    const gridAll = document.querySelectorAll('.grid');
    const btnRandomDeploy = document.querySelector('.random-deploy-button');

    // If random deploy button is clicked
    btnRandomDeploy.addEventListener('click', () =>
      GameBoard.changeToPlayPhase()
    );

    // If all player ships are manually deployed
    gridAll.forEach((grid) =>
      grid.addEventListener('click', () => {
        if (!Ship.getFirstDeployablePlayerShip()) GameBoard.changeToPlayPhase();
      })
    );
  }
}
