/*
 * The `assets` module
 * ===================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `node_modules/phaser/resources/` directory, for a more complete
 * reference.
 */

export default {
  // -- The splash screen assets, displayed during the 'Preload' state.
  boot: [{
    key: 'splash-screen',
    type: 'image'
  }, {
    key: 'progress-bar',
    type: 'image'
  }],

  // -- General game assets
  game: [{
    key: 'phaser',
    type: 'image'
  },
  {
    key: 'zamith',
    type: 'image'
  },
  {
    key: 'blue_block',
    type: 'image'
  },
  {
    key: 'cyan_block',
    type: 'image'
  },
  {
    key: 'purple_block',
    type: 'image'
  },
  {
    key: 'red_block',
    type: 'image'
  },
  {
    key: 'white_block',
    type: 'image'
  },
  {
    key: 'yellow_block',
    type: 'image'
  },
  {
    key: 'board0',
    type: 'image'
  },
  {
    key: 'board1',
    type: 'image'
  },
  {
    key: 'board2',
    type: 'image'
  },
  {
    key: 'board3',
    type: 'image'
  },
  {
    key: 'inner-board0',
    type: 'image'
  },
  {
    key: 'inner-board1',
    type: 'image'
  },
  {
    key: 'inner-board2',
    type: 'image'
  },
  {
    key: 'inner-board3',
    type: 'image'
  }
  // }, {
  //   // Example: Add background music.
  //   key: 'tune',
  //   type: 'audio',
  //   urls: [ 'tune.oga', 'tune.m4a' ]
  // }, {
  //   // Example: Add an audio sprite with some sound effects.
  //   key: 'sfx',
  //   type: 'audiosprite',
  //   urls: [ 'sfx.m4a' ],
  //   jsonURL: 'sfx.json'
  ]};