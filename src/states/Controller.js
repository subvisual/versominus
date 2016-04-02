/* eslint-disable */
import AirConsole from './Air_Console';

export default class Controller {
  constructor (game) {
    this.game = game;
    this.airConsole = new AirConsole();
    this.airConsole.message(AirConsole.CONTROLLER, 'How are you?');

    this.airConsole.onMessage = this.onMessage.bind(this);
  }

  getControllers() {
    return this.airConsole.getControllerDeviceIds()
  }

  getNickname(controllerId) {
    return this.airConsole.getNickname(controllerId);
  }

  getMasterControllerDeviceId() {
    return this.airConsole.getMasterControllerDeviceId();
  }

  onMessage(from, data) {
    console.log(data);
  }

  sendMessage(to, data) {
    this.airConsole.message(to, data);
  }

  getMasterController() {
    return this.airConsole.getMasterControllerDeviceId();
  }

  convertPlayerNumberToDeviceId(player) {
    return this.airConsole.convertPlayerNumberToDeviceId(player);
  }
}
