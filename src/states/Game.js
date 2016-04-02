import Players from './Players';
import Controller from './Controller';
import BoardWrapper from '../objects/BoardWrapper';

export default class Game extends Phaser.State {
  create () {
    this.controller = new Controller();
    this.players = new Players(this.controller);

    this.boards = {};
    this.players.onPlayerConnect(this.addBoardForPlayer.bind(this));
    this.players.onPlayerAction(this.routeActionForBoard.bind(this));
  }

  update () {
    super.update();
  }

  addBoardForPlayer(player) {
    const board = new BoardWrapper(this.game, player.playerNumber);
    this.boards[player.playerNumber] = board;
    this.game.add.existing(board);
  }

  routeActionForBoard(action) {
    const board = this.boards[action.player.playerNumber];
    if (!board)
      return;

    board.ctrl.sendAction(action.data);
  }
}
