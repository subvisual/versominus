const Size = 30;

export default class Block extends Phaser.Sprite {
  constructor(game, x, y, color) {
    super(game, x, y, `${color}_block`);

    this.anchor.set(0);
    this.x = x * Size;
    this.y = y * Size;
    this.width = Size;
    this.height = Size;
  }

}
