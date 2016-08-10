export default class KeyboardController {
  constructor(game) {
    this.game = game;
    this.players = [];
    this.messageListeners = [];
    this.connectListeners = [];

    setTimeout(this.init.bind(this), 0);
  }

  init() {
    this.players.push('Debug 1');
    this.sendConnect(0);
    this.players.push('Debug 2');
    this.sendConnect(1);
    this.sendConnect(2);
    this.sendConnect(3);
    this.game.input.keyboard.onDownCallback = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    if (event.keyCode === Phaser.Keyboard.UP)
      this.sendToScreen(0, 'ROTATE');
    if (event.keyCode === Phaser.Keyboard.LEFT)
      this.sendToScreen(0, 'LEFT');
    if (event.keyCode === Phaser.Keyboard.RIGHT)
      this.sendToScreen(0, 'RIGHT');
    if (event.keyCode === Phaser.Keyboard.W)
      this.sendToScreen(1, 'ROTATE');
    if (event.keyCode === Phaser.Keyboard.A)
      this.sendToScreen(1, 'LEFT');
    if (event.keyCode === Phaser.Keyboard.D)
      this.sendToScreen(1, 'RIGHT');
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
    if (this.players.length)
      return 0;

    return null;
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
