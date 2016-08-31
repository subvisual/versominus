import Pieces from './Pieces/All';

export default {
  createRandom(game, x, y) {
    const index = Math.floor(Math.random() * (Object.keys(Pieces).length - 0));
    const key = Object.keys(Pieces)[index];
    return new Pieces[key](game, x, y);
  },
};
