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

  // Filter undeployed ships, and deploy them on click
  static deployShip() {
    const gridAll = document.querySelectorAll('.grid');

    // Hover effects
    this.gridHoverEffects();

    // Deploy ship on click
    gridAll.forEach((singleGrid) =>
      singleGrid.addEventListener('click', () => {
        const currentGridLength = Number(singleGrid.textContent);

        // If there is only one ship existing before the click,
        // Then

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

        // Set grid color
        this.setGridColor(
          currentGridLength,
          shipArray[0].length,
          shipArray[0].rotation,
          'black',
          'white'
        );

        // Remove first element from array if deployment was successful.
        shipArray.shift();

        // Set ship img/text
        if (shipArray[0]) this.setShipInfo(shipArray[0].shipType);
      })
    );
  }

  // Switch ship rotation no button click
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

  // Loop ship length and add hover effects on grids.
  // Set next grid's length according to rotation.(10 for vertical, 1 for horizontal.)
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

  // Set ship placeholder text/img src from 'shipType'
  static setShipInfo(shipType) {
    let shipInfoText = document.querySelector('.ship-info-text');
    let shipImg = document.querySelector('.ship-img');
    shipInfoText.textContent = shipType[0].toUpperCase() + shipType.slice(1);
    shipImg.src = `/dist/img/${shipType}.png`;
    shipImg.alt = `${shipType} image`;
  }

  // End deployment phase by hiding modal children and moving game board to the left
  // Display computer game board
  static endDeploymentPhase() {
    const gridAll = document.querySelectorAll('.grid');
    const gameBoardMain = document.querySelector('.gameboard-main');
    const modalShipInfoGroup = document.getElementById('modal-ship-info');
    const playerGameBoard = document.getElementById('player-game-board');
    const computerGameBoard = document.getElementById('computer-game-board');
    const rotateButton = document.getElementById('rotate-button');
    const gameTitle = document.getElementById('game-title');

    gridAll.forEach((grid) =>
      grid.addEventListener('click', () => {
        if (shipArray.length === 0) {
          // Game board style changes
          for (let i = 0; i < 100; i++) {
            if (playerGameBoard.childNodes[i].style.backgroundColor !== `black`)
              playerGameBoard.childNodes[i].textContent = '';
          }

          // Style changes for play phase preparation
          gameTitle.style.display = 'block';
          computerGameBoard.style.display = 'grid';
          gameBoardMain.style.transform = 'translate(-100%)';
          modalShipInfoGroup.style.display = 'none';
          rotateButton.style.display = 'none';
        }
      })
    );
  }

  //GameBoard grid 'Mouseover' 'Mouseout' 'Click' actions
  static gridHoverEffects() {
    const gridAll = document.querySelectorAll('.grid');

    // Highlight current grid on 'mouseover'
    gridAll.forEach((singleGrid) => {
      singleGrid.addEventListener('mouseover', () => {
        const currentGridLength = Number(singleGrid.textContent);

        // If ship is deployable to the current grid, highlight it.
        if (
          shipArray[0] &&
          GameBoard.isShipDeployable(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation
          )
        )
          this.setGridColor(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation,
            `gray`
          );
      });
    });

    // Cancel highlight when 'mouseout'
    gridAll.forEach((singleGrid) =>
      singleGrid.addEventListener('mouseout', () => {
        const currentGridLength = Number(singleGrid.textContent);
        // Check if ship deployment is legit, before trying to cancel the hover effect.
        if (
          shipArray[0] &&
          GameBoard.isShipDeployable(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation
          )
        )
          this.setGridColor(
            currentGridLength,
            shipArray[0].length,
            shipArray[0].rotation,
            'white'
          );
      })
    );
  }
}
