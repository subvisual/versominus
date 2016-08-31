import _ from 'lodash';
import Piece from './Piece';

const Width = 300;
const Height = 600;
const Columns = 10;

export default class Board extends Phaser.Group {
  constructor(game, index, boards) {
    super(game, null, 'Board');

    this.game = game;
    this.index = index;
    this.x = index * Width;
    this.y = 0;
    this.points = 0;
    this.boards = boards;

    this.setBackground();
    this.setText();
    this.addPiece();
  }

  update() {
    if (!this.game.isRunning) {
      return;
    }

    this.removeCompletedLines();
    this.instantiateNewPiece();
    this.updatePiecesState();
    super.update();
  }

  instantiateNewPiece() {
    if (this.movingPieces.length === 0) {
      this.addPiece();
    }
  }

  setText() {
    this.scoreText = new Phaser.Text(this.game, 50, 10, 'Score: 0', {
      font: '20px Arial',
      fill: '#fff',
      align: 'left',
    });

    this.add(this.scoreText);
  }

  setScore(score) {
    this.scoreText.setText(`Score: ${score}`);
  }

  updatePiecesState() {
    const stopped = this.stoppedBlocks();
    this.movingPieces.forEach(piece => {
      if (this.isPieceAtBottom(piece) || piece.checkCollisionBelow(stopped)) {
        piece.stop();
      }
    });
  }

  isPieceAtBottom() {
    return _.some(this.movingBlocks(), block => (
      block.y + block.size === Height
    ));
  }

  hasPieceBelow(piece) {
    return _.some(this.stoppedPieces, (otherPiece => piece.x === otherPiece.x && piece.y + piece.blockSize === otherPiece.y));
  }

  hasBlockBelow(block) {
    return _.some(this.stoppedBlocks, (otherBlock => block.x === otherBlock.x && block.y + block.blockSize === otherBlock.y));
  }

  isSideFree(block, direction) {
    if (direction < 0 && block.x === 0) {
      return false;
    }

    if (direction > 0 && block.x + block.size === this.width) {
      return false;
    }

    const stoppedBlocks = this.stoppedBlocks();
    if (stoppedBlocks.length === 0) {
      return true;
    }

    return _.every(stoppedBlocks, (stoppedBlock) =>
      block.y !== stoppedBlock.y || (block.x + (block.size * direction)) !== stoppedBlock.x
    );
  }

  stoppedBlocks() {
    return _.flatten(this.stoppedPieces.map((piece) =>
      piece.blocks.map(block =>
        ({ x: block.x + piece.x, y: block.y + piece.y, size: piece.blockSize, piece, block })
      )
    ));
  }

  movingBlocks() {
    return _.flatten(this.movingPieces.map((piece) =>
      piece.blocks.map(block =>
        ({ x: block.x + piece.x, y: block.y + piece.y, size: piece.blockSize })
      )
    ));
  }

  get movingPieces() {
    return _.reject(this.pieces, (piece) => piece.stopped);
  }

  get movingPiece() {
    return _.find(this.pieces, (piece) => !piece.stopped);
  }

  get stoppedPieces() {
    return _.filter(this.pieces, (piece) => piece.stopped);
  }

  setBackground() {
    const bg = new Phaser.TileSprite(
      this.game,
      0, 0,
      Width, Height,
      `boards/${this.index}`
    );

    this.add(bg);
  }

  addPiece(x = null, y = null) {
    x = x || this.width / 2;
    y = y || 0;
    const piece = Piece.createRandom(this.game, x, y);

    this.pieces = this.pieces || [];
    this.add(piece);
    this.pieces.push(piece);
  }

  isValid() {
    const movingBlocks = this.movingBlocks();

    const isOutOfBounds = _.some(movingBlocks, block => (
      block.x < 0 || block.x >= Width || block.y < 0 || block.y >= Height
    ));

    if (isOutOfBounds) {
      return false;
    }

    const stoppedBlocks = this.stoppedBlocks();

    const isOverlaping = _.some(movingBlocks, movingBlock => (
      _.some(stoppedBlocks, stoppedBlock => (
        movingBlock.x === stoppedBlock.x && movingBlock.y === stoppedBlock.y
      ))
    ));

    return !isOverlaping;
  }

  allBlocks() {
    const blocks = [];
    this.pieces.forEach(piece => blocks.push(piece.blocks));
    return _.flatten(blocks);
  }

  removeCompletedLines() {
    let lines = _.groupBy(this.stoppedBlocks(), block => (block.y));
    lines = _.filter(lines, line => line.length === Columns);

    _.each(lines, this.removeLine.bind(this), this);
    this.removeEmptyPieces();
    this.assignPoints(lines.length);
    this.fuckEnemies(lines.length);
  }

  removeLine(line) {
    line.forEach(block => {
      block.piece.removeBlocks(block.block);
    });

    const upperBlocks = _.filter(this.stoppedBlocks(), block => block.y < line[0].y);

    upperBlocks.forEach(block => block.block.y += block.size);
  }

  removeEmptyPieces() {
    const emptyPieces = _.filter(this.stoppedPieces, piece => piece.isEmpty);

    this.pieces = _.without(this.pieces, emptyPieces);
  }

  fuckEnemies(numberOfLines) {
    if (!numberOfLines) {
      return;
    }

    const enemies = _.filter(this.boards, board => board.index !== this.index);
    enemies.forEach(enemy => enemy.board.fuckMe(numberOfLines));
  }

  fuckMe() {
    const piece = this.movingPiece;
    if (!piece) {
      return;
    }
    const x = piece.x;
    const y = piece.y;

    piece.destroy();
    this.remove(piece);
    this.pieces = _.without(this.pieces, piece);
    this.addPiece(x, y);
  }

  assignPoints(numberOfLines) {
    this.points += numberOfLines * 2;

    this.setScore(this.points);
  }
}
