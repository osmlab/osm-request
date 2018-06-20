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
  devtool: 'cheap-module-source-map',
  entry: {
    OsmRequest: path.join(__dirname, 'src/index.js')
  },
  output: {
    library: 'OsmRequest',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    modules: [
      'node_modules',
      process.env.NODE_PATH
    ]
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
