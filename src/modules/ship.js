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

  static createShipArray() {
    return [
      new Ship('submarine', 2),
      new Ship('destroyer', 3),
      new Ship('destroyer', 3),
      new Ship('cruiser', 4),
      new Ship('carrier', 5),
    ];
  }
  static setPlayerShips() {
    return (this.playerShips = this.createShipArray());
  }
  static getPlayerShips() {
    return this.playerShips;
  }
  static setComputerShips() {
    return (this.computerShips = this.createShipArray());
  }
  static getComputerShips() {
    return this.computerShips;
  }
  static setShipCoordinates(currentGrid, shipLength, rotation) {
    let arr = [currentGrid];
    for (let i = 1; i < shipLength; i++) {
      let nextGrid;
      rotation === 'horizontal'
        ? (nextGrid = currentGrid + i)
        : (nextGrid = currentGrid + i * 10);
      arr.push(nextGrid);
    }
    return arr;
  }
}
