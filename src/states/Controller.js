/* eslint-disable */
import AirConsole from '../vendor/Air_Console';

export default class Controller {
  constructor () {
    this.airConsole = new AirConsole();
  }

  onConnect(callback) {
    return this.airConsole.onConnect = callback;
  }

  setActivePlayers(maxPlayers) {
    return this.airConsole.setActivePlayers(maxPlayers);
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

  onMessage(callback) {
    this.airConsole.onMessage = callback;
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

  convertDeviceIdToPlayerNumber(deviceId) {
    return this.airConsole.convertDeviceIdToPlayerNumber(deviceId);
  }
}
