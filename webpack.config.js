const webpack = require('webpack');
const path = require('path');
console.log(__dirname);
module.exports = {
  entry: './src/init.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'build.js',
    publicPath: './dist'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        options: { presets: [ 'stage-0', 'react', 'es2015' ] }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      bail: true
    })
  ]
};
