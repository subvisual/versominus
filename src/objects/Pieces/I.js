import Base from './Base'

export default class I extends Base {
  get color() {
    return 'yellow';
  }

  get startPositions() {
    return [
      { x: 0, y: -1 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 }
    ]
  }
}
