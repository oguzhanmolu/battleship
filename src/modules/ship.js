export default class Ship {
  constructor(shipType, length) {
    this.shipType = shipType;
    this.length = length;
    this.health = length;
    this.rotation = 'vertical';
    this.isDeployed = false;
    this.isSunk = false;
    this.coordinates = [];
    this.playerShips = [];
    this.computerShips = [];
  }

  // Create ship array
  static createShipArray() {
    return [
      new Ship('submarine', 2),
      new Ship('destroyer', 3),
      new Ship('destroyer', 3),
      new Ship('cruiser', 4),
      new Ship('carrier', 5),
    ];
  }
  // Set player ships
  static setPlayerShips() {
    return (this.playerShips = this.createShipArray());
  }
  // Get player ships
  static getPlayerShips() {
    return this.playerShips;
  }
  // Get first player deployable ship
  static getFirstDeployablePlayerShip() {
    return this.playerShips.filter((ship) => ship.isDeployed === false)[0];
  }
  // Set computer ships
  static setComputerShips() {
    return (this.computerShips = this.createShipArray());
  }
  // Get computer ships
  static getComputerShips() {
    return this.computerShips;
  }

  // Switch ship rotation with 'Rotate Ship' click
  static switchShipRotation() {
    const btnRotate = document.querySelector('.rotate-button');
    const playerShipArray = this.getPlayerShips();
    btnRotate.addEventListener('click', () => {
      playerShipArray.map((ship) =>
        ship.rotation === 'vertical'
          ? (ship.rotation = 'horizontal')
          : (ship.rotation = 'vertical')
      );
    });
  }

  // Set ship coordinates from current grid/length/rotation values
  static setShipCoordinates(currentGridIndex, shipLength, rotation) {
    let arr = [currentGridIndex];
    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGridIndex + i)
        : (nextGrid = currentGridIndex + i * 10);
      arr.push(nextGrid);
    }
    return arr;
  }
}
