/*
 * Preload state
 * =============
 *
 * This state takes care of loading the main game assets, including graphics
 * and sound effects, while displaying a splash screen with a progress bar,
 * showing how much progress were made during the asset load.
 */

import assets from '../assets';

export default class Preload extends Phaser.State {

  preload() {
    this.showSplashScreen();
    this.load.pack('game', null, assets);
  }

  create() {
    // Here is a good place to initialize plugins that depend on any game
    // asset. Example:
    // this.add.plugin(MyPlugin/*, ... initialization parameters ... */);

    this.state.start('Game');
  }

  // --------------------------------------------------------------------------

  showSplashScreen() {
    this.add.image(0, 0, 'splash-screen');
    this.add.image(0, 0, 'boards/0');
    this.add.image(0, 0, 'boards/1');
    this.add.image(0, 0, 'boards/2');
    this.add.image(0, 0, 'boards/3');
    this.add.image(0, 0, 'boards/inner-0');
    this.add.image(0, 0, 'boards/inner-1');
    this.add.image(0, 0, 'boards/inner-2');
    this.add.image(0, 0, 'boards/inner-3');
    this.load.setPreloadSprite(this.add.image(82, 282, 'progress-bar'));
  }

}
