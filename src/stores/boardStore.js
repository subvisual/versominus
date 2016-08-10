import _ from 'lodash';
import { createStore } from 'reflux';

import BoardActions from '../actions/boardActions';

class Board {
  constructor(playerId) {
    this.playerId = playerId;
  }
}

export default createStore({
  store: {
    boards: {}
  },

  listenables: BoardActions,

  onAdd(playerId) {
    this.store.boards[playerId] = new Board(playerId);

    this.trigger(this.store);
  },

  onRemove(playerId) {
    this.store.boards = _.extend({}, _.reject(this.store.boards, { playerId }));

    this.trigger(this.store);
  }
});
