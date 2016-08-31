import _ from 'lodash';

import PlayerArea from '../objects/PlayerArea';
import PlayerCtrl from '../ctrls/PlayerCtrl';

const MAX_PLAYERS = 4;

export default class Players {
  constructor(game, controller) {
    this.game = game;
    this.players = {};
    this.connectedDevices = [];
    this.controller = controller;

    this.controller.onMessage(this.onMessage);
    this.controller.onConnect(this.onConnect);
  }

  onConnect = (deviceId) => {
    this.setActivePlayers(Object.keys(this.players).length + 1);
    const player = this.addPlayer(deviceId);
    this.setMasterPlayer();
    this.sendSelfState(deviceId);
    this.introducePlayers();
  }

  onMessage = (from, data) => {
    const playerNumber = this.getPlayerNumber(from);
    const player = this.players[playerNumber];

    if (!player) {
      return;
    }

    player.ctrl.sendAction(data);
  }

  sendSelfState(deviceId) {
    const player = this.players[this.getPlayerNumber(deviceId)];
    this.controller.sendMessage(deviceId, {
      type: 'setPlayer',
      player,
    });
  }

  addPlayer(deviceId) {
    const nickName = this.controller.getNickname(deviceId);
    const playerNumber = this.getPlayerNumber(deviceId);

    if (this.players[playerNumber]) {
      return;
    }

    const playerArea = new PlayerArea(this.game, playerNumber);
    const ctrl = new PlayerCtrl(playerArea)
    this.game.add.existing(playerArea);

    const player = { deviceId, nickName, playerNumber, playerArea, ctrl };

    this.players[playerNumber] = player;
    return player;
  }

  getPlayer(playerNumber) {
    return this.players[playerNumber];
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
}
