import Base from './Base';

export default class PieceSquare extends Base {
  get color() {
    return 'blue';
  }

  get startPositions() {
    return [
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
    ];
  }

  rotate(_direction) {
  }
}
