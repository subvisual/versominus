const Width = 230;
const Height = 480;
const InnerWidth = 200;
const InnerOffset = 15;

const Colors = [
  Phaser.Color.RGBtoString(96, 184, 213, 0.2, '#'),
  Phaser.Color.RGBtoString(118, 230, 198, 0.2, '#'),
  '#e57676',
  Phaser.Color.RGBtoString(254, 208, 92, 0.2, '#'),
];

export default class Board extends Phaser.Group {
  constructor (game, index, x, y, width, height) {
    super(game, null, 'Board');

    this.game = game;
    this.index = index;
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;

    this.setBackground();
    console.log('dsar345')
  }

  update() {
    this.game.debug.geom(this.rect, Colors[this.index])
  }

  setBackground() {
    this.rect = new Phaser.Rectangle(this.x, this.y, this.w, this.h);
  }
}
