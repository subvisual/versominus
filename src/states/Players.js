import _ from 'lodash';

const MAX_PLAYERS = 4;

export default class Players {
  constructor(controller) {
    this.players = {};
    this.connectedDevices = [];
    this.controller = controller;
    this.messageListeners = [];
    this.connectListeners = [];

    this.controller.onMessage(this.onMessage.bind(this));
    this.controller.onConnect(this.onConnect.bind(this));
  }

  onConnect(deviceId) {
    this.setActivePlayers(Object.keys(this.players).length + 1);
    const player = this.addPlayer(deviceId);
    this.setMasterPlayer();
    this.sendSelfState(deviceId);
    this.introducePlayers();
    this.connectListeners.forEach(listener => listener(player));
  }

  sendSelfState(deviceId) {
    const player = this.players[this.getPlayerNumber(deviceId)];
    this.controller.sendMessage(deviceId, {
      type: 'setPlayer',
      player,
    });
  }

  onMessage(from, data) {
    const playerNumber = this.getPlayerNumber(from);
    const player = this.players[playerNumber];

    if (!player) {
      return;
    }

    this.messageListeners.forEach(listener => listener({ player, data }));
  }

  addPlayer(deviceId) {
    const nickName = this.controller.getNickname(deviceId);
    const playerNumber = this.getPlayerNumber(deviceId);

    if (this.players[playerNumber]) {
      return;
    }

    const player = { deviceId, nickName, playerNumber };

    this.players[playerNumber] = player;
    return player;
  }

  getPlayerNumber(deviceId) {
    return this.controller.convertDeviceIdToPlayerNumber(deviceId);
  }

  setMasterPlayer() {
    const master = this.controller.getMasterControllerDeviceId();
    const playerNumber = this.getPlayerNumber(master);

    this.players[playerNumber].master = true;
  }

  introducePlayers() {
    const type = 'playersList';

    _.each(this.players, player => {
      const enemies = _.reject(this.players, enemy => enemy.playerNumber === player.playerNumber);

      if (!Object.keys(enemies).length) {
        return;
      }

      this.controller.sendMessage(player.deviceId, { type, enemies });
    });
  }

  removePlayer(deviceId) {
    delete this.players[deviceId];
  }

  setActivePlayers(length) {
    if (length > MAX_PLAYERS) {
      return;
    }

    this.controller.setActivePlayers(length);
  }

  onPlayerAction(callback) {
    return this.messageListeners.push(callback);
  }

  onPlayerConnect(callback) {
    return this.connectListeners.push(callback);
  }
}
