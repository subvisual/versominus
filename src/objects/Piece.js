const TimeBetweenTicks = 50;

export default class Piece extends Phaser.Sprite {
  constructor(game, x, y) {
    console.log(1)
    super(game, x, y, 'zamith');

    this.anchor.set(0);
    this.x = 0;
    this.y = 0;
    this.width = 20;
    this.height = 20;
  }

  update() {
    if (this.stopped || !this.tickCheck()) {
      return;
    }

    this.y += this.height;
  }

  tickCheck() {
    if (!this.lastTick) {
      this.lastTick = this.game.time.now;
      return true;
    } else {
      let currentTick = this.game.time.now;
      let result = (currentTick - this.lastTick > TimeBetweenTicks);
      if (result) {
        this.lastTick = currentTick;
      }
      return result;
    }
  }

  stop() {
    this.stopped = true;
  }
}
