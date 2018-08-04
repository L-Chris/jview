'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    proxy: config.dev.proxyTable,
    compress: true,
    historyApiFallback: true,
    publicPath: config.dev.assetsPublicPath,
    port: config.dev.port,
    open: true,
    hot: true,
    quiet: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new HtmlWebpackPlugin({
      title: 'dev',
      filename: 'index.html',
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

module.exports = webpackConfig