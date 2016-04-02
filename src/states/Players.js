import _ from 'lodash';

const MAX_PLAYERS = 4;

export default class Players {
  constructor (controller) {
    this.players = {};
    this.connectDevices = [];
    this.controller = controller;
    this.messageListeners = [];

    this.controller.onMessage(this.onMessage.bind(this));
  }

  update() {
    const oldPlayerList = { ...this.players };
    const connectDevices = this.controller.getControllers();

    connectDevices.forEach(this.addPlayer.bind(this));

    if (_.isEqual(oldPlayerList, this.players))
      return;

    this.setMasterPlayer();
    this.introducePlayers();
    // this.setActivePlayers();
  }

  onMessage(from, data) {
    const player = this.players[from];

    if (!player)
      return;

    this.messageListeners.forEach(listener => listener({player, data}));
  }

  addPlayer(deviceId) {
    if (this.players[deviceId])
      return;

    console.log('add new players'); // eslint-disable-line
    const nickName = this.controller.getNickname(deviceId);
    this.players[deviceId] = { deviceId, nickName };
    console.log(this.players); // eslint-disable-line
  }

  setMasterPlayer() {
    const master = this.controller.getMasterControllerDeviceId();

    if (!master || !this.anyPlayerConnected())
      return;

    this.players[master].master = true;
  }

  introducePlayers() {
    if (!this.anyPlayerConnected())
      return;

      console.log('here5');

    _.each(this.players, player => {
      const enemies = _.omit(this.players, (enemy) => {
        return enemy.deviceId === player.deviceId;
      });

      this.controller.sendMessage(player.deviceId, {
        type: 'playersList',
        enemies
      });
    });
  }

  removePlayer(deviceId) {
    delete this.players[deviceId];
  }

  setActivePlayers() {
    if (!this.anyPlayerConnected)
      return;

    const activePlayers = this.controller.setActivePlayers(MAX_PLAYERS);
    console.log('setActivePlayers', activePlayers); // eslint-disable-line
  }

  anyPlayerConnected() {
    return Object.keys(this.players).length;
  }
}
