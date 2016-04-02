import _ from 'lodash';
import Piece from './Piece';
import BoardCtrl from '../ctrls/BoardCtrl';

const Width = 200;
const Height = 400;
const OffsetLeft = 25;
const OffsetTop = 80;

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
    return piece.y + piece.height == Height;
  }

  hasPieceBelow(piece) {
    return _.some(this.stoppedPieces, (otherPiece => piece.x == otherPiece.x && piece.y + piece.blockSize == otherPiece.y));
  }

  isSideFree(block, direction) {
    if (block.x === 0 || block.x + block.width === this.width) {
      return false;
    }

    let stoppedBlocks = this.stoppedBlocks();
    return _.every(stoppedBlocks, (stoppedBlock) =>
      block.y != stoppedBlock.y || block.x + block.width * direction != stoppedBlock.x
    );
  }

  stoppedBlocks() {
    return _.flatten(this.stoppedPieces.map((piece) =>
      piece.blocks.map(block =>
        ({ x: block.x + piece.x, y: block.y + piece.y })
      )
    ));
  }

  movingBlocks() {
    return _.flatten(this.movingPieces.map((piece) =>
      piece.blocks.map(block =>
        ({ x: block.x + piece.x, y: block.y + piece.y })
      )
    ));
  }

  get movingPieces() {
    return _.reject(this.pieces, (piece) => piece.stopped);
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
    var piece = Piece.createRandom(this.game, 0, 0);

    this.pieces = this.pieces || [];
    this.add(piece);
    this.pieces.push(piece);
  }
}
