const path = require('path');
const glob = require('glob');
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
    const filepath = resolveBase(`src/pages/${key}.html`);
    return new HtmlWebpackPlugin({
      filename,
      template: `ejs-compiled-loader!${filepath}`,
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
      'styles': resolveBase('src/styles'),
      'images': resolveBase('src/public/images'),
      'assets': resolveBase('src/public/assets')
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
        test: /\.(png|jpg|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[contenthash].[ext]',
              outputPath: 'images',
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: htmls
};
