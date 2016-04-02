import Controller from './Controller';
import BoardWrapper from '../objects/BoardWrapper';

export default class Game extends Phaser.State {
  create () {
    this.players = [];
    this.controllers = [];
    this.controller = new Controller(this.game);

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
  }

  update () {
    const controllers = this.controller.getControllers();

    if (controllers.length !== this.controllers.length) {
      console.log('new active players'); // eslint-disable-line
      this.controllers = controllers;

      controllers.forEach((controller) => {
        this.players.push(this.controller.getNickname(controller));
        this.masterController = this.controller.getMasterControllerDeviceId();
      });

      console.log(this.players); // eslint-disable-line
      console.log(this.masterController); // eslint-disable-line
    }
  }
}
