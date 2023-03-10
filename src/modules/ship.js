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

// // Deploy  computer ships randomly
// while (computerShipArray.length !== 0) {
//   let randomIndex = Math.floor(Math.random() * 101);
//   let randomRotation =
//     Math.floor(Math.random() * 2) === 0 ? 'vertical' : 'horizontal';

//   if (
//     GameBoard.isShipDeployable(
//       randomIndex,
//       computerShipArray[0].length,
//       randomRotation
//     )
//   ) {
//     this.setGridColor(
//       computerGameBoard,
//       randomIndex,
//       computerShipArray[0].length,
//       randomRotation,
//       'black',
//       'white'
//     );
//     computerShipArray.shift();
//   }
// }
