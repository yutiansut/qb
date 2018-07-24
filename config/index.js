'use strict'

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    mode:'development',

    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,


    devtool: 'cheap-module-eval-source-map',

    //导入变量
    externals:{}
  },

  build: {
    index: path.resolve(__dirname, '../src/index.template.html'),

    mode: 'production',
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    productionSourceMap: false,
    devtool: '#source-map',

    externals:{}
  }
}
