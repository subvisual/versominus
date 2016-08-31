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
      default: console.debug(`Unknown action: ${data}`); break;
    }
  }

  moveLeft() {
    if (this.canMove(-1)) {
      this.move(-1, 0);
    }
  }

  moveRight() {
    if (this.canMove(1)) {
      this.move(1, 0);
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

  move(offsetX, offsetY) {
    this.board.movingPieces.forEach(piece => {
      piece.move(offsetX, offsetY);
    });
  }

  rotateWithOffset(offset) {
    this.move(offset, 0);
    this.board.movingPiece.rotate(1);

    const valid = this.board.isValid();

    if (!valid) {
      this.board.movingPiece.rotate(-1);
      this.move(-offset, 0);
    }

    return valid;
  }
}
