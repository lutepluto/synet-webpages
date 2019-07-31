const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const baseConfig = require('./common');

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    runtimeChunk: 'single'
  },
  devtool: 'cheap-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: process.cwd(),
    publicPath: '/build/',
    hot: true,
    hotOnly: true,
    port: 3000
  }
});
