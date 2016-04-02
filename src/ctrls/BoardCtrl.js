export default class BoardCtrl {
  constructor(board) {
    this.board = board;
    console.log('asd')
  }

  sendAction(data) {
    switch (data) {
      case "LEFT": this.moveLeft(); break;
      case "RIGHT": this.moveRight(); break;
      case "ROTATE": break;
    }
  }

  moveLeft() {
    if (this.canMove(-1)) {
      this.move(-1);
    }
  }

  moveRight() {
    if (this.canMove(1)) {
      this.move(1);
    }
  }

  canMove(offset) {
    return _.every(this.board.movingBlocks(), (block) =>
      this.board.isSideFree(block, offset)
    );
  }

  move(offset) {
    console.log(4)
    this.board.movingPieces.forEach(piece => {
      piece.x += piece.blockSize * offset;
    })
  }
}
