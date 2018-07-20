const path = require('path');
const webpack = require('webpack');
const config = require('../config')

module.exports = {
  // entry: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],// 指定入口文件，程序从这里开始编译,__dirname当前目录, ../表示上一级目录, ./同级目录
  output: {
    path: config.build.assetsRoot, // 输出的路径
    filename: 'app/[name].js', // 打包后文件
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader', // 加载器
        exclude: /node_modules/,
        // include: [
        //   // 包括 babel inherts 处理，兼容 ie10
        //   // babel-plugin-transform-proto-to-assign
        //   // 将 inherits.js 中的 subClass.__proto__ = superClass 进行转换
        //   // /\/node_modules\/babel-runtime\/helpers\/inherits/
        // ],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader',
      //     },
      //     {
      //       loader: 'css-loader',
      //     },
      //   ],
      // },
      {
        test: /\.(css|styl)$/,
        // loaders: ['style-loader', 'css-loader', 'stylus-loader']
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'stylus-loader'}]
      },
      // {
      //   exclude: [/\.js$/, /\.html$/, /\.json$/,/\.styl$/],
      //   loader:require.resolve('file-loader'),
      //
      //   options: {
      //     name: 'static/[name].[ext]',
      //   },
      // },
      {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          exclude: /node_modules/,
      },

    ],
  },
  externals: process.env.NODE_ENV === 'production'
    ? config.build.externals
    : config.dev.externals
};
