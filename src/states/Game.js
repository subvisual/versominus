import Players from './Players';
import Controller from './Controller';
import BoardWrapper from '../objects/BoardWrapper';

export default class Game extends Phaser.State {
  create () {
    this.controller = new Controller();
    this.players = new Players(this.controller);

    this.boards = [
      new BoardWrapper(this.game, 0),
      new BoardWrapper(this.game, 1),
      new BoardWrapper(this.game, 2),
      new BoardWrapper(this.game, 3)
    ];

    this.game.add.existing(this.boards[0]);
    this.game.add.existing(this.boards[1]);
    this.game.add.existing(this.boards[2]);
    this.game.add.existing(this.boards[3]);

    this.players.onPlayerAction(action => {
      let board = this.boards[action.player.playerNumber];
      if (board) {
        board.ctrl.sendAction(action.data);
      }
    })
  }

  update () {
    this.players.update();
    super.update();
  }
}
