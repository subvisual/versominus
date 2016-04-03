export default class Block extends Phaser.Sprite {
  constructor(game, baseX, baseY, x, y, color) {
    super(game, x, y, `${color}_block`);

    this.anchor.set(0);
    this.x = baseX + x * 20;
    this.y = baseY + y * 20;
    this.width = 20;
    this.height = 20;
  }

}
