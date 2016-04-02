import Logo from '../objects/Logo';
import Controller from './Controller';

export default class Game extends Phaser.State {
  create () {
    this.controller = new Controller(this.game);

    const { centerX: x, centerY: y } = this.world;
    this.add.existing(new Logo(this.game, x, y));
  }

  update () {
  }
}
