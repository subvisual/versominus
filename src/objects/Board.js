import _ from 'lodash';
import Piece from './Piece';

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

    this.setBackground();
    this.addPiece();
  }

  update() {
    this.instantiateNewPiece();
    this.checkPiecesState();
    super.update();
  }

  instantiateNewPiece() {
    if (this.movingPieces.length == 0) {
      this.addPiece();
    }
  }

  checkPiecesState() {
    this.movingPieces.forEach(piece => {
      if (this.isPieceAtBottom(piece) || this.hasPieceBelow(piece)) {
        piece.stop();
      }
    });
  }

  isPieceAtBottom(piece) {
    return piece.y + piece.height == Height;
  }

  hasPieceBelow(piece) {
    return _.some(this.stoppedPieces, (otherPiece => piece.x == otherPiece.x && piece.y + piece.height == otherPiece.y));
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
    var piece = new Piece(
      this.game,
      this.x,
      this.y,
    );

    this.pieces = this.pieces || [];
    this.add(piece);
    this.pieces.push(piece);
  }
}
