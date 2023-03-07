export default class Ship {
  constructor(shipType, length) {
    this.shipType = shipType;
    this.length = length;
    this.health = length;
    this.rotation = 'vertical';
    this.isSunk = false;
  }

  static createShipObject() {
    const shipArray = [
      new Ship('submarine', 2),
      new Ship('destroyer', 3),
      new Ship('destroyer', 3),
      new Ship('cruiser', 4),
      new Ship('carrier', 5),
    ];
    return shipArray;
  }
}
