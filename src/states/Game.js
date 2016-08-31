import Players from './Players';
import Board from '../objects/Board';
import inputController from '../ctrls/InputCtrl';
import BoardCtrl from '../ctrls/BoardCtrl';

export default class Game extends Phaser.State {
  create() {
    this.inputCtrl = inputController(this.input);
    this.players = new Players(this.inputCtrl, this.startGame);

    this.state = {};
    this.players.onPlayerConnect(this.addBoardForPlayer);
    this.players.onPlayerAction(this.routeActionForBoard);

    this.game.isRunning = false;
  }

  update() {
    super.update();
  }

  startGame = () => {
    this.game.isRunning = true;
  }

  addBoardForPlayer = (player) => {
    const board = new Board(this.game, player.playerNumber, this.boards);
    const ctrl = new BoardCtrl(board);

    this.state[player.playerNumber] = { board, ctrl };

    this.game.add.existing(board);
  }

  routeActionForBoard = (action) => {
    // Temporary logic to start the game on the first ROTATE action
    if (action.player.master && action.data === 'ROTATE' && !this.game.isRunning) {
      return this.startGame();
    }

    const ctrl = this.state[action.player.playerNumber].ctrl;

    if (ctrl) {
      ctrl.sendAction(action.data);
    }
  }
}
