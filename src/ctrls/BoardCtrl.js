export default class BoardCtrl {
  constructor(board) {
    this.board = board;
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
      move(-1);
    }
  }

  moveRight() {
    if (this.canMove(1)) {
      move(1);
    }
  }

  canMove(offset) {
    return this.game.hasPieceAtSide(offset);
  }

  move(offset) {
    this.board.pieces.forEach(piece => {
      piece.x += piece.blockSize * offset;
    })
  }
}
