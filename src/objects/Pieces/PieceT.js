import Base from './Base';

export default class PieceT extends Base {
  get color() {
    return 'purple';
  }

  get startPositions() {
    return [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: 0 },
    ];
  }
}
