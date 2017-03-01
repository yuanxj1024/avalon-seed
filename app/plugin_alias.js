var path = require('path');
var containerPath = path.resolve('./');

var alias = {
  tip: path.resolve(containerPath, './app/src/custom_plugins/tip'),
  hls: path.resolve(containerPath, './node_modules/hls.js/dist/hls.js')
};

module.exports = alias;
