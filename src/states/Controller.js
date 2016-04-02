/* eslint-disable */
import AirConsole from './Air_Console';

export default class Controller {
  constructor (game) {
    this.game = game;
    this.airConsole = new AirConsole();
    this.airConsole.message(AirConsole.CONTROLLER, 'How are you?');

    this.airConsole.onMessage = this.onMessage.bind(this);
  }

  onMessage(from, data) {
    console.log(data);
    this.airConsole.message(from, 'Full of pixels!');
  }

  sendMessage(to, data) {
    this.airConsole.message(to, data);
  }
}
