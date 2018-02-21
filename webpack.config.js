const webpack = require('webpack');
const path = require('path');

const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    mangle: true,
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  })
];

module.exports = {
  plugins,
  devtool: 'source-map',
  entry: {
    OsmRequest: path.join(__dirname, 'src/index.js')
  },
  output: {
    library: 'OsmRequest',
    libraryTarget: 'umd',
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
