import _ from 'lodash';
import Block from './Block';
const TimeBetweenTicks = 500;

export default class extends Phaser.Group {
  constructor(game, x, y) {
    super(game, null, 'Piece');

    this.game = game;
    this.x = x;
    this.y = y;

    this.addBlocks();
  }

  rotate() {
    this.blocks.forEach(block => {
      let x = block.y;
      let y = - block.x;

      block.x = x;
      block.y = y;
    });
  }

  unrotate() {
    this.blocks.forEach(block => {
      let x = - block.y;
      let y = block.x;

      block.x = x;
      block.y = y;
    })
  }

  addBlocks() {
    this.startPositions.forEach(position => {
      const block = new Block(this.game, position.x, position.y, this.color);

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
        this.x + block.x == stopped.x && this.y + block.y + block.height == stopped.y
      ))
    ));
  }
}
