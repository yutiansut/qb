const path = require('path');
const webpack = require('webpack');

module.exports = {
  // entry: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],// 指定入口文件，程序从这里开始编译,__dirname当前目录, ../表示上一级目录, ./同级目录
  output: {
    path: path.resolve(__dirname, '../dist'), // 输出的路径
    filename: 'app/[name]_[hash:8].js', // 打包后文件
  },
  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader', // 加载器
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.styl$/,
        // loaders: ['style-loader', 'css-loader', 'stylus-loader']
        use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'stylus-loader'
            }]
      },
      {
        exclude: [/\.js$/, /\.html$/, /\.json$/,/\.styl$/],
        loader:require.resolve('file-loader'),
        
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }
    ],
  },
};
