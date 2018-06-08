const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('../config')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const env = require('../config/dev.env.js')

module.exports = merge(webpackConfig, {
  devtool: config.dev.devtool,
  mode: config.dev.mode,
  entry: [
    `webpack-dev-server/client?http://${HOST || config.dev.host}:${PORT || config.dev.port}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../src/index.js'),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.template.html'),
      inject: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    //配置static目录拷贝到服务器目录下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
});
