import { createStore } from 'reflux';

import gameActions from '../actions/gameActions';

export default createStore({
  store: {},

  listenables: gameActions,

  onRotate(player) {
    console.log(`player: ${player} asked to rotate the piece`);
  },

  onMoveLeft(player) {
    console.log(`player: ${player} asked to move left the piece`);
  },

  onMoveRight(player) {
    console.log(`player: ${player} asked to move right the piece`);
  }
});
