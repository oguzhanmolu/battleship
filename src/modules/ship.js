export default class Ship {
  constructor(shipType, length) {
    this.shipType = shipType;
    this.length = length;
    this.health = length;
    this.rotation = 'vertical';
    this.isDeployed = false;
    this.isSink = false;
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
}
