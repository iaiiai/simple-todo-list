const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

const ENTRY_FILE = path.resolve(__dirname, 'src/app.js');
const OUTPUT_DESTINATION = path.resolve(__dirname, 'dist');
const HTML_TEMPLATE_PATH = path.resolve(__dirname, 'src/static/index.html');

module.exports = {
  entry: {
    main: ENTRY_FILE,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: OUTPUT_DESTINATION,
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: HTML_TEMPLATE_PATH,
      },
    ),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader',
        exclude: '/node_modules/',
      }
    ]
  },

  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 5000,
  }
}
