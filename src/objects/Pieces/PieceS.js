import Base from './Base';

export default class PieceS extends Base {
  get color() {
    return 'cyan';
  }

  get startPositions() {
    return [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
    ];
  }
}
