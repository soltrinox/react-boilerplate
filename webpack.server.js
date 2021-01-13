// Module Start
// JS imports
const path = require('path');
const nodeExternals = require('webpack-node-externals');

// Webpack - Configuration (Server)
// Module export
module.exports = {
  entry: './server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('server-build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
// Module End
