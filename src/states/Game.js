import BoardWrapper from '../objects/BoardWrapper';
import Logo from '../objects/Logo';
import Controller from './Controller';

export default class Game extends Phaser.State {
  create () {
    this.controller = new Controller(this.game);

    const { centerX: x, centerY: y } = this.world;

    var boards = [
      new BoardWrapper(this.game, 0),
      new BoardWrapper(this.game, 1),
      new BoardWrapper(this.game, 2),
      new BoardWrapper(this.game, 3),
    ]

    this.game.add.existing(boards[0]);
    this.game.add.existing(boards[1]);
    this.game.add.existing(boards[2]);
    this.game.add.existing(boards[3]);
  }

  update () {
  }
}
