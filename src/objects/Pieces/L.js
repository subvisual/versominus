import Base from './Base';

export default class L extends Base {
  get color() {
    return 'red';
  }

  get startPositions() {
    return [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 2 }
    ]
  }
}
