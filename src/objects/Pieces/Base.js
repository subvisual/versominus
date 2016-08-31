import _ from 'lodash';
import Block from './Block';
const TimeBetweenTicks = 250;

export default class extends Phaser.Group {
  constructor(game, x, y) {
    super(game, null, 'Piece');

    this.game = game;
    this.x = x;
    this.y = y;

    this.addBlocks();
  }

  get width() {
    const max_x = _.reduce(this.blocks, (max, block) => Math.max(max, block.x), -1);

    return max_x + 1;
  }

  rotate(direction = 1) {
    this.blocks.forEach(block => {
      const x = block.y;
      const y = -block.x;

      block.x = x;
      block.y = y;
    });
  }

  move(offsetX, offsetY) {
    this.x += this.blockSize * offsetX;
    this.y += this.blockSize * offsetY;
  }

  addBlocks() {
    this.startPositions.forEach(position => {
      const block = new Block(this.game, position.x, position.y, this.color);

      this.add(block);
      this.blocks = this.blocks || [];
      this.blocks.push(block);
    });
  }

  removeBlocks(block) {
    this.remove(block);
    this.blocks = _.without(this.blocks, block);
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
      const currentTick = this.game.time.now;
      const result = (currentTick - this.lastTick > TimeBetweenTicks);
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
        this.x + block.x == stopped.x && this.y + block.y + block.height == stopped.y
      ))
    ));
  }

  get isEmpty() {
    return !this.blocks.length;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
