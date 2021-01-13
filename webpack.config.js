// Module Start
// JS imports
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const LoadablePlugin = require('@loadable/webpack-plugin');

// Webpack - Configuration (Client)
// Module export
module.exports = {
  target: 'web',
  mode:
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      ? 'development'
      : 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.join(
      path.resolve(
        __dirname,
        process.env.NODE_ENV === 'production' ? 'public/dist' : 'public/lib',
      ),
    ),
    filename:
      process.env.NODE_ENV === 'production'
        ? '[name]-bundle-[chunkhash:8].js'
        : '[name].js',
    publicPath: `/dist`,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed),
    }),
    new LoadablePlugin(),
  ],
};
// Module End
