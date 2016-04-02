import Logo from '../objects/Logo';
import Controller from './Controller';
import AirConsole from './Air_Console';

export default class Game extends Phaser.State {
  create () {
    this.controller = new Controller(this.game);
    this.controller.sendMessage(AirConsole.CONTROLLER, 'game ready!');
    const { centerX: x, centerY: y } = this.world;
    this.add.existing(new Logo(this.game, x, y));
  }

  update () {
    this.controller.sendMessage(AirConsole.CONTROLLER, 'game ready!');
  }
}
