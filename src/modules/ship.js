export default class Ship {
  constructor(length) {
    this.length = length;
    this.health = length;
    this.isSunk = false;
  }
}
