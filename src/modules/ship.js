export default class Ship {
  constructor(shipType, length) {
    this.shipType = shipType;
    this.length = length;
    this.rotation = 'vertical';
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
}
