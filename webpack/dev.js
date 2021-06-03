const webpack = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = require('./common');

module.exports = merge(baseConfig, {
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
  devtool: 'eval-source-map',
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
