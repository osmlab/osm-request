const path = require('path');

module.exports = {
  mode: 'development',
  plugins: [],
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
    ],
    fallback: {
      "stream": false,
      "timers": false,
      "buffer": false,
      "string_decoder": false,
    }
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
