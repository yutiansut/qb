'use strict'

const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack/webpack.dev.config');
const webpack = require('webpack');
const path = require('path');
const compiler = webpack(webpackConfig);
const config = require('../config')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    contentBase: path.resolve(__dirname, '../dist'), //默认会以根文件夹提供本地服务器，这里指定文件夹,
    stats: {
      colors: true
    },
    inline: false, // 自动刷新
    hot: false, // 开启热模块替换
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    host: HOST || config.dev.host,
    port: PORT || config.dev.port, //如果省略，默认8080
    publicPath: config.dev.assetsPublicPath,
    open: config.dev.autoOpenBrowser
});

const server = new WebpackDevServer(compiler, devServerOptions);

const port = PORT || config.dev.port;
const host = HOST || config.dev.host;

server.listen(port, 'localhost', function (err) {
   console.log(`Starting server on ${host}:${port}`);
    if (err) throw err
})
