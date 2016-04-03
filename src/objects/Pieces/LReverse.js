import L from './L'

export default class LReverse extends L {
  get startPositions() {
    return [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 }
    ]
  }
}
