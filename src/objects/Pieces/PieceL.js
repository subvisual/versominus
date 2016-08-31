import Base from './Base';

export default class PieceL extends Base {
  get color() {
    return 'red';
  }

  get startPositions() {
    return [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
    ];
  }
}
