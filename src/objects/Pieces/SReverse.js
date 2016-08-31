import S from './S';

export default class SReverse extends S {
  get startPositions() {
    return [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];
  }
}
