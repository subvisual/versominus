import Players from './Players';
import Board from '../objects/Board';
import PlayerArea from '../objects/PlayerArea';
import inputController from '../ctrls/InputCtrl';
import PlayerCtrl from '../ctrls/PlayerCtrl';

export default class Game extends Phaser.State {
  create() {
    this.inputCtrl = inputController(this.input);
    this.players = new Players(this.game, this.inputCtrl);

    this.pieces = new Board(this);

    this.state = {};
  }

  update() {
    super.update();
  }
}
