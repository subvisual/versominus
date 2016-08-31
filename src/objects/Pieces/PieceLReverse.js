import PieceL from './PieceL';

export default class PieceLReverse extends PieceL {
  get startPositions() {
    return [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 1 },
    ];
  }
}
