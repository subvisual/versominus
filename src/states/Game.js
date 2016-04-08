import Players from './Players';
import BoardWrapper from '../objects/BoardWrapper';
import InputController from '../ctrls/InputCtrl';

export default class Game extends Phaser.State {
  create () {
    this.inputCtrl = InputController(this.game);
    this.players = new Players(this.inputCtrl, this.startGame.bind(this));

    this.boards = {};
    this.players.onPlayerConnect(this.addBoardForPlayer.bind(this));
    this.players.onPlayerAction(this.routeActionForBoard.bind(this));

    this.game.isRunning = false;
  }

  update () {
    super.update();
  }

  startGame() {
    this.game.isRunning = true;
  }

  addBoardForPlayer(player) {
    const board = new BoardWrapper(this.game, player.playerNumber, this.boards);
    this.boards[player.playerNumber] = board;
    this.game.add.existing(board);
  }

  routeActionForBoard(action) {
    if (action.player.master && action.data === 'ROTATE' && !this.game.isRunning)
      return this.startGame();

    const board = this.boards[action.player.playerNumber];
    if (!board)
      return;

    board.ctrl.sendAction(action.data);
  }
}
