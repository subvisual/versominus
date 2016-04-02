const Width = 230;
const Height = 480;
const InnerWidth = 200;
const InnerOffset = 15;

const Colors = [
  '#69bfde',
  '#47ecc2',
  '#fb7e7e',
  '#fed15c'
];

export default class Board extends Phaser.Group {
  constructor (game, x, y, width, height) {
    super(game, null, 'Board');

    this.game = game;
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.setBackground();
  }

  update() {
    this.game.debug.geom(this.rect, Colors[this.index]);
  }

  setBackground() {
    this.rect = new Phaser.Rectangle(this.x, this.y, this.w, this.h);
  }
}
