import Pieces from './Pieces/All';

export default {
  createRandom(game, x, y) {
    let index = Math.floor(Math.random() * (Object.keys(Pieces).length - 0));
    let key = Object.keys(Pieces)[index];
    return new Pieces[key](game, x, y);
  }
};
