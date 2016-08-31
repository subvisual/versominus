export default class KeyboardController {
  constructor(input) {
    this.input = input;
    this.players = [];
    this.messageListeners = [];
    this.connectListeners = [];

    setTimeout(this.init, 0);
  }

  init = () => {
    this.players.push('Debug 1');
    this.sendConnect(0);
    this.players.push('Debug 2');
    this.sendConnect(1);
    this.sendConnect(2);
    this.sendConnect(3);
    this.input.keyboard.onDownCallback = this.onKeyDown;
  }

  onKeyDown = (event) => {
    switch (event.keyCode) {
      case Phaser.Keyboard.UP:
        this.sendToScreen(0, 'ROTATE');
        break;
      case Phaser.Keyboard.LEFT:
        this.sendToScreen(0, 'LEFT');
        break;
      case Phaser.Keyboard.RIGHT:
        this.sendToScreen(0, 'RIGHT');
        break;

      case Phaser.Keyboard.W:
        this.sendToScreen(1, 'ROTATE');
        break;
      case Phaser.Keyboard.A:
        this.sendToScreen(1, 'LEFT');
        break;
      case Phaser.Keyboard.D:
        this.sendToScreen(1, 'RIGHT');
        break;

      default:
        break;
    }
  }

  sendToScreen(from, data) {
    this.messageListeners.forEach(listener => listener(from, data));
  }

  onMessage(callback) {
    this.messageListeners.push(callback);
  }

  sendMessage(to, data) {
    console.log('Send message to', to, data);
  }

  sendConnect(deviceId) {
    this.connectListeners.forEach(listener => listener(deviceId));
  }

  onConnect(callback) {
    this.connectListeners.push(callback);
  }

  getMasterControllerDeviceId() {
    if (this.players.length) {
      return 0;
    }
  }

  convertDeviceIdToPlayerNumber(deviceId) {
    return deviceId;
  }

  getNickname(deviceId) {
    return this.players[deviceId];
  }

  setActivePlayers() {
    console.log('Set active players called');
  }
}
