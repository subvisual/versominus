import _ from 'lodash';

export default class BoardCtrl {
  constructor(board) {
    this.board = board;
  }

  sendAction(data) {
    switch (data) {
      case 'LEFT': this.moveLeft(); break;
      case 'RIGHT': this.moveRight(); break;
      case 'ROTATE': this.tryToRotate(); break;
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

  tryToRotate() {
    this.rotateWithOffset(0) || this.rotateWithOffset(1) || this.rotateWithOffset(-1) || this.rotateWithOffset(2) || this.rotateWithOffset(-2);
  }

  canMove(offset) {
    return _.every(this.board.movingBlocks(), (block) =>
      this.board.isSideFree(block, offset)
    );
  }

  move(offset) {
    this.board.movingPieces.forEach(piece => {
      piece.x += piece.blockSize * offset;
    });
  }

  rotateWithOffset(offset) {
    this.move(offset);
    this.board.movingPiece.rotate();
    if (this.board.isInvalid()) {
      this.board.movingPiece.unrotate();
      this.move(-offset);
      return false;
    } else {
      return true;
    }
  }
}
