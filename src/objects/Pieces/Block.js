export default class Block extends Phaser.Sprite {
  constructor(game, x, y, color) {
    super(game, x, y, `${color}_block`);

    this.anchor.set(0);
    this.x = x * 20;
    this.y = y * 20;
    this.width = 20;
    this.height = 20;
  }

}
