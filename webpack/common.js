const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseDir = process.cwd();
function resolveBase(relativePath) {
  return path.resolve(baseDir, relativePath);
}

const entries = glob.sync(resolveBase('./src/scripts/entries/*.js'))
  .reduce((prev, curr) => {
    const regex = new RegExp(`\\${path.sep}([^.\\${path.sep}]+)\\.js$`);
    const re = regex.exec(curr);
    if (re && re.length) {
      prev[re[1]] = curr;
    }
    return prev;
  }, {});

const htmls = Object.keys(entries)
  .map(key => {
    const filename = `./pages/${key}.html`;
    const template = resolveBase(`src/pages/${key}.html`);
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: true,
      chunks: [key]
    })
  });

module.exports = {
  entry: entries,
  output: {
    path: path.join(baseDir, 'build'),
    filename: 'scripts/[name].js',
    publicPath: '/build/'
  },
  resolve: {
    alias: {
      'images': resolveBase('src/public/images')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader'
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  },
  plugins: htmls
};
