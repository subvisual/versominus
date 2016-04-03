import Base from './Base';

export default class AlmostCompleteLine extends Base {
  get color() {
    return 'red';
  }

  get startPositions() {
    return [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 }
    ];
  }
}
