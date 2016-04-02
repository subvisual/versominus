import _ from 'lodash';

const MAX_PLAYERS = 4;

export default class Players {
  constructor (controller) {
    this.players = {};
    this.connectedDevices = [];
    this.controller = controller;
    this.messageListeners = [];

    this.controller.onMessage(this.onMessage.bind(this));
    this.controller.onConnect(this.onConnect.bind(this));
  }

  update() {
  }

  onConnect(deviceId) {
    this.setActivePlayers(Object.keys(this.players).length + 1);
    this.addPlayer(deviceId);
    this.setMasterPlayer();
    this.introducePlayers();
    this.sendSelfState(deviceId);
  }

  sendSelfState(deviceId) {
    console.log('here');
    this.controller.sendMessage(deviceId, {
      type: 'setPlayer',
      player: this.players[deviceId]
    });
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

    console.log('add new player'); // eslint-disable-line
    const nickName = this.controller.getNickname(deviceId);
    const playerNumber =  this.controller.convertDeviceIdToPlayerNumber(deviceId);

    this.players[deviceId] = { deviceId, nickName, playerNumber };
  }

  setMasterPlayer() {
    const master = this.controller.getMasterControllerDeviceId();

    if (!master)
      return;

    this.players[master].master = true;
  }

  introducePlayers() {
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

  setActivePlayers(length) {
    if (length > MAX_PLAYERS)
      return;

    console.log('setActivePlayers', length);
    this.controller.setActivePlayers(length);
  }
}
