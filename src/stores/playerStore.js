import { createStore } from 'reflux';

import GameActions from '../actions/gameActions';
import PlayerActions from '../actions/playerActions';

class Player {
  constructor(id, device) {
    this.id = id;
    this.device = device;
  }
}

class Device {
  constructor(playerId) {
    this.playerId = playerId;
  }
}

export default createStore({
  store: {
    players: {},
    devices: {}
  },

  listenables: PlayerActions,

  onReceiveMessage: (from, data) => {
    const playerNumber = this.store.devices[from];
    const player = this.store.players[playerNumber];

    if(!player)
      return;

    GameActions.playerAction(player, data);
  },

  onReceiveConnect: (from) => {
    const playerId = Object.keys(this.store.players).length + 1;
    const device = new Device(playerId);
    const player = new Player(playerId, device);

    this.store.devices[from] = device;
    this.store.players[playerId] = player;

    this.trigger(this.store);
  }
});
