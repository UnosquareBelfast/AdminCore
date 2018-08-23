const path = require('path');

let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|ttf|gif|svg|woff|eot)$/,
        use: [
          { loader: 'url-loader', options: { limit: 8192 } },
          // limit => file.size =< 8192 bytes ? DataURI : File
        ],
      },
    ],
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: {
      index: '/',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    },
  },
  plugins: [
    new FaviconsWebpackPlugin('./admincore.png'),
    new HtmlWebpackPlugin({
      template: './src/index.template.ejs',
      inject: 'body',
    }),
    new Dotenv(),
  ],
};
