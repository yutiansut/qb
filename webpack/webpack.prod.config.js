const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const env = require('../config/prod.env.js')
const config = require('../config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackConfig, {
  mode: "production",
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot, // 输出的路径
    filename: "app/[name].[chunkhash:8].js", // 打包后文件
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        core: {
          test: /.[\\/]core[\\/]/,
          name: "core",
          chunks: "all"
        },
        react: {
          test: /[\\/]node_modules[\\/]react/,
          name: "react",
          chunks: "all"
        },
        vendors: {
          test: /[\\/]node_modules[\\/](?!react)/,
          name: "vendors",
          chunks: "all"
        },
        // vendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all'
        // },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  //插件
  plugins: [
    //简化JavaScript
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false
        }
      },
      // sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    //传递环境变量，todo此处有待修改
    new webpack.DefinePlugin({
      "process.env": env
    }),

    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),

    //配置static目录拷贝到服务器目录下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ]),

    //生成简化的html文件，
    new HtmlWebpackPlugin({
      template: config.build.index,
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ]
});
