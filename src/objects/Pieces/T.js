import Base from './Base'

export default class T extends Base {
  get color() {
    return 'purple';
  }

  get startPositions() {
    return [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 1 }
    ]
  }
}
