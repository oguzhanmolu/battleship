import GameBoard from './gameboard';
import Ship from './ship';
import PlayPhase from './playPhase';
const shipArray = Ship.createShipArray();

export default class DeploymentPhase {
  // Create 10x10 game board
  static createPlayerGameBoard() {
    const playerGameBoard = document.getElementById('player-game-board');
    playerGameBoard.classList.add('game-board');
    GameBoard.createGameBoard(playerGameBoard);
  }

  // Set grid colors according to ship length and rotation
  static setGridColor(
    currentGrid,
    shipLength,
    rotation,
    background,
    textColor
  ) {
    const playerGameBoard = document.getElementById('player-game-board');

    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGrid + i)
        : (nextGrid = currentGrid + i * 10);

      playerGameBoard.childNodes[currentGrid].style.backgroundColor =
        background;
      playerGameBoard.childNodes[nextGrid].style.backgroundColor = background;

      if (textColor)
        playerGameBoard.childNodes[currentGrid].style.color = textColor;
      playerGameBoard.childNodes[nextGrid].style.color = textColor;
    }
  }

  // Set text/img src from 'shipType'
  static setShipInfo(shipType) {
    let shipInfoText = document.querySelector('.ship-info-text');
    let shipImg = document.querySelector('.ship-img');
    shipInfoText.textContent = shipType[0].toUpperCase() + shipType.slice(1);
    shipImg.src = `/dist/img/${shipType}.png`;
    shipImg.alt = `${shipType} image`;
  }

  // Switch ship rotation with 'Rotate Ship' click
  static switchShipRotation() {
    const rotateButton = document.getElementById('rotate-button');
    rotateButton.addEventListener('click', () => {
      shipArray.map((ship) =>
        ship.rotation === 'vertical'
          ? (ship.rotation = 'horizontal')
          : (ship.rotation = 'vertical')
      );
    });
  }

  // Deploy first ship from shipArray on click
  // And shift the element
  static deployShip() {
    const gridAll = document.querySelectorAll('.grid');

    gridAll.forEach((grid) =>
      grid.addEventListener('click', () => {
        const currentGridLength = Number(grid.id);

        // Check if ship is deployable to the current grid
        if (
          !shipArray[0] ||
          !GameBoard.isShipDeployable(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation
          )
        )
          return;

        // Set grid color on successful deployment
        this.setGridColor(
          currentGridLength,
          shipArray[0].length,
          shipArray[0].rotation,
          'black',
          'white'
        );

        // Shift first ship element on successful deployment
        shipArray.shift();

        // Set ship img/text
        if (shipArray[0]) this.setShipInfo(shipArray[0].shipType);
      })
    );
  }

  // Game board hover actions
  static gridHoverEffects() {
    const gridAll = document.querySelectorAll('.grid');

    // Highlight current grid on 'mouseover'
    gridAll.forEach((grid) => {
      grid.addEventListener('mouseover', () => {
        const currentGridLength = Number(grid.id);

        // If ship is deployable,
        if (
          shipArray[0] &&
          GameBoard.isShipDeployable(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation
          )
        )
          // Set color
          this.setGridColor(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation,
            `gray`
          );
      });
    });

    // Cancel hover effect on 'mouseout'
    gridAll.forEach((grid) =>
      grid.addEventListener('mouseout', () => {
        const currentGridLength = Number(grid.id);
        // Check deployability again
        if (
          shipArray[0] &&
          GameBoard.isShipDeployable(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation
          )
        )
          // Set color
          this.setGridColor(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation,
            'white'
          );
      })
    );
  }

  // End deployment phase when all of the ships are deployed.
  static endDeploymentPhase() {
    const gridAll = document.querySelectorAll('.grid');
    const modalShipInfoGroup = document.getElementById('modal-ship-info');
    const playerGameBoard = document.getElementById('player-game-board');
    const rotateButton = document.getElementById('rotate-button');
    const gameBoardTitle = document.querySelectorAll('.gameboard-title');
    const playerMain = document.getElementById('player-gameboard-main');
    const computerMain = document.getElementById('computer-gameboard-main');

    gridAll.forEach((grid) =>
      grid.addEventListener('click', () => {
        if (shipArray.length === 0) {
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
          rotateButton.style.display = 'none';
        }
      })
    );
  }
}
