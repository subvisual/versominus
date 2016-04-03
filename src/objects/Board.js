import _ from 'lodash';
import Piece from './Piece';
import BoardCtrl from '../ctrls/BoardCtrl';

const Width = 300;
const Height = 600;
const Columns = 10;

const Colors = [
  Phaser.Color.RGBtoString(96, 184, 213, 0.2, '#'),
  Phaser.Color.RGBtoString(118, 230, 198, 0.2, '#'),
  '#e57676',
  Phaser.Color.RGBtoString(254, 208, 92, 0.2, '#'),
];

export default class Board extends Phaser.Group {
  constructor (game, index, x, y) {
    super(game, null, 'Board');

    this.game = game;
    this.index = index;
    this.x = x;
    this.y = y;

    this.ctrl = new BoardCtrl(this);

    this.setBackground();
    this.addPiece();
  }

  update() {
    this.removeCompletedLines();
    this.instantiateNewPiece();
    this.updatePiecesState();
    super.update();
  }

  instantiateNewPiece() {
    if (this.movingPieces.length == 0) {
      this.addPiece();
    }
  }

  updatePiecesState() {
    let stopped = this.stoppedBlocks();
    this.movingPieces.forEach(piece => {
      if (this.isPieceAtBottom(piece) || piece.checkCollisionBelow(stopped)) {
        piece.stop();
      }
    });
  }

  isPieceAtBottom(piece) {
    return _.some(this.movingBlocks(), block => (
      block.y + block.size == Height
    ));
  }

  hasPieceBelow(piece) {
    return _.some(this.stoppedPieces, (otherPiece => piece.x == otherPiece.x && piece.y + piece.blockSize == otherPiece.y));
  }

  hasBlockBelow(block) {
    return _.some(this.stoppedBlocks, (otherBlock => block.x == otherBlock.x && block.y + block.blockSize == otherBlock.y));
  }

  isSideFree(block, direction) {
    if (direction < 0 && block.x === 0) {
      return false;
    }

    if (direction > 0 && block.x + block.size === this.width) {
      return false;
    }

    let stoppedBlocks = this.stoppedBlocks();
    if (stoppedBlocks.length === 0) {
      return true;
    }

    return _.every(stoppedBlocks, (stoppedBlock) =>
      block.y != stoppedBlock.y || block.x + block.size * direction != stoppedBlock.x
    );
  }

  stoppedBlocks() {
    return _.flatten(this.stoppedPieces.map((piece) =>
      piece.blocks.map(block =>
        ({ x: block.x + piece.x, y: block.y + piece.y, size: piece.blockSize, piece, block})
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
    var bg = new Phaser.TileSprite(
      this.game,
      0, 0,
      Width, Height,
      `inner-board${this.index}`
    );

    this.add(bg);
  }

  addPiece() {
    const piece = Piece.createRandom(this.game, this.width / 2, 0);

    this.pieces = this.pieces || [];
    this.add(piece);
    this.pieces.push(piece);
  }

  isInvalid() {
    let movingBlocks = this.movingBlocks();

    let boundariesCheck = _.some(movingBlocks, block => (
      block.x < 0 || block.x >= Width || block.y < 0 || block.y >= Height
    ));


    if (boundariesCheck) {
      return true;
    }

    let stoppedBlocks = this.stoppedBlocks();

    let stoppedCheck = _.some(movingBlocks, movingBlock => (
      _.some(stoppedBlocks, stoppedBlock => (
        movingBlock.x == stoppedBlock.x && movingBlock.y == stoppedBlock.y
      ))
    ));

    return stoppedCheck;
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
}
