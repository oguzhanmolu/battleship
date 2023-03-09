import GameBoard from './gameboard';
import Ship from './ship';
const shipArray = Ship.createShipArray();

export default class ModalGameBoard {
  // Create 10x10 game board
  static createModalGameBoard() {
    const modalGameBoard = document.getElementById('modal-game-board');
    modalGameBoard.classList.add('game-board');
    GameBoard.createGameBoard(modalGameBoard);
  }

  // Filter undeployed ships, and deploy them on click
  static deployShip() {
    const gridAll = document.querySelectorAll('.grid');
    // const modalGameBoard = document.getElementById('modal-game-board');

    // Hover effects
    this.gridHoverEffects();

    // Deploy ship on click
    gridAll.forEach((singleGrid) =>
      singleGrid.addEventListener('click', () => {
        const currentGridLength = Number(singleGrid.textContent);

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
          'orange'
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
      console.log(shipArray);
    });
  }

  // Loop ship length and add hover effects on grids.
  // Set next grid's length according to rotation.(10 for vertical, 1 for horizontal.)
  static setGridColor(currentGrid, shipLength, rotation, color) {
    const modalGameBoard = document.getElementById('modal-game-board');

    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGrid + i)
        : (nextGrid = currentGrid + i * 10);

      modalGameBoard.childNodes[currentGrid].style.backgroundColor = color;
      modalGameBoard.childNodes[nextGrid].style.backgroundColor = color;
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

  //GameBoard grid 'Mouseover' 'Mouseout' 'Click' actions
  static gridHoverEffects(shipLength, rotation) {
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
            'rgba(0,0,0,.5)'
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
