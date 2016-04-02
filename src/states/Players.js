const MAX_PLAYERS = 4;

export default class Players {
  constructor (controller) {
    this.players = {};
    this.connectDevices = [];
    this.controller = controller;
  }

  update() {
    const connectDevices = this.controller.getControllers();

    connectDevices.forEach(this.addPlayer.bind(this));

    this.setMasterPlayer();
  }

  addPlayer(deviceId) {
    if (this.players[deviceId])
      return;

    console.log('add new playerss');
    const nickName = this.controller.getNickname(deviceId);
    this.players[deviceId] = { deviceId, nickName };
    console.log(this.players); // eslint-disable-line
  }

  setMasterPlayer() {
    const master = this.controller.getMasterControllerDeviceId();

    if (!master || !Object.keys(this.players).length)
      return;

    this.players[master].master = true;
  }

  removePlayer(deviceId) {
    delete this.players[deviceId];
  }

  setActivePlayers() {
    return this.controller.setActivePlayers(MAX_PLAYERS);
  }
}
