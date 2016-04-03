import Board from './Board';

const Width = 330;
const Height = 630;
const InnerOffsetLeft = 15;
const InnerOffsetTop = 30;

const Colors = [
  '#69bfde',
  '#47ecc2',
  '#fed15c',
  '#fb7e7e'
];

export default class BoardWrapper extends Phaser.Group {
  constructor (game, index) {
    super(game, null, 'BoardWrapper');

    this.game = game;
    this.index = index;

    this.setBackground();
    this.setBoard();
  }

  get ctrl() {
    return this.board.ctrl;
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
    this.board = new Board(
      this.game,
      this.index,
      this.index * Width + InnerOffsetLeft,
      InnerOffsetTop,
    );

    this.add(this.board);
  }
}
