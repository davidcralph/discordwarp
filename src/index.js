const path = require('path');
const { main } = require('./backend/main');

module.exports = {
  main,
  preloadPath: path.join(__dirname, 'backend', 'preload.js'),
};
