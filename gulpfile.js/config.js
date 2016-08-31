/*
 * Project configuration
 * =====================
 */

'use strict';


// Where this project source code lives.
const SRC = 'src';

// Where final distribution files will be copied.
const DIST = 'dist';

// Where compiled scripts will be placed.
const BUILD = 'build';

// Where static assets (textures, fonts, sprites, sounds etc.) live.
const STATIC = 'static';

// Which Phaser build was selected to develop the game.
const PHASER = 'node_modules/phaser/build/custom/phaser-no-physics.js';


module.exports = {

  // Build output directories.
  dirs: {
    build: BUILD,
    dist: DIST,
  },

  // File paths and glob patterns.
  files: {
    // Finds this project static assets to be copied for distribution.
    assets: STATIC + '/**',

    // Finds the scripts to be compiled.
    scripts: SRC + '/**/*.js',

    // The selected Phaser script.
    phaser: PHASER,
  },

  // The Browserify settings.
  bundle: {
    debug: true,
    standalone: 'app',
    entries: [
      'src/app.js',
    ],
    transform: [
      'babelify',
    ],
  },

  // The BrowserSync settings.
  server: {
    server: {
      baseDir: [
        STATIC,
        BUILD,
      ],
      routes: {
        '/phaser.js': PHASER,
      },
    },
    ghostMode: false,
    notify: false,
  },

};
