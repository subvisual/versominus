export default class Piece extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'zamith');

    this.anchor.set(0);
    this.x = 0;
    this.y = 0;
    this.width = 20;
    this.height = 20;
  }
}
