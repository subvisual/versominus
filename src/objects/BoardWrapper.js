import Board from './Board';

const Width = 250;
const Height = 480;
const InnerWidth = 200;
const InnerHeight = 400;
const InnerOffsetLeft = 25;
const InnerOffsetTop = 80;
const Colors = [
  '#c00',
  '#0c0',
  '#00c',
  '#ccc'
];

export default class BoardWrapper extends Phaser.Group {
  constructor (game, index) {
    super(game, null, 'BoardWrapper');

    this.game = game;
    this.index = index;

    this.setBackground();

    this.setBoard();
  }

  update() {
    this.game.debug.geom(this.rect, Colors[this.index])
  }

  setBackground() {
    this.rect = new Phaser.Rectangle(this.index * Width, 0, Width, Height);
  }

  setBoard() {
    var board = new Board(this.game, this.index * Width + InnerOffsetLeft, InnerOffsetTop, InnerWidth, InnerHeight);
    this.add(board);
    this.game.add.existing(board);
  }
}
