import Board from './Board';

const Width = 250;
const Height = 480;
const InnerOffsetLeft = 25;
const InnerOffsetTop = 80;

const Colors = [
  '#69bfde',
  '#47ecc2',
  '#fb7e7e',
  '#fed15c'
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
  }

  setBackground() {
    var bg = new Phaser.TileSprite(
      this.game,
      this.index * Width,
      0,
      Width,
      Height,
      `board${this.index}`
    );

    this.add(bg);
  }

  setBoard() {
    var board = new Board(
      this.game,
      this.index,
      this.index * Width + InnerOffsetLeft,
      InnerOffsetTop,
    );

    this.add(board);
  }
}
