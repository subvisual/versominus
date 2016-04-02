import Block from './Block';
const TimeBetweenTicks = 50;

export default class extends Phaser.Group {
  constructor(game, x, y) {
    super(game, null, 'Piece');

    this.game = game;
    this.x = x;
    this.y = y;

    this.addBlocks();
  }

  addBlocks() {
    this.startPositions.forEach(position => {
      var block = new Block(this.game, this.x, this.y, position.x, position.y);

      this.add(block);
      this.blocks = this.blocks || [];
      this.blocks.push(block);
    })
  }

  get blockSize() {
    return this.blocks[0].height;
  }

  update() {
    if (this.stopped || !this.tickCheck()) {
      return;
    }

    this.y += this.blocks[0].height;
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

  checkCollisionBelow(stoppedBlocks) {
    return _.some(this.blocks, block => (
      _.some(stoppedBlocks, (stopped) => (
        this.y + block.y + block.height == stopped.y
      ))
    ));
  }
}
