import Piece from './Piece';

const Width = 200;
const Height = 480;
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
    this.game.debug.geom(this.rect, Colors[this.index])
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

    this.add(piece);
  }
}
