'use strict';

module.exports = {
  entry: './src/js/script.js',
  output: {
    filename: './src/build.js'
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  }
};
