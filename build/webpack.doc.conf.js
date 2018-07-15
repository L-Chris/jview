'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.doc.productionSourceMap ? 'source-map' : false,
  output: {
    path: config.doc.assetsRoot,
    publicPath: config.doc.assetsPublicPath,
    filename: utils.assetsPath('[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('[id].[chunkhash].js')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            properties: false,
            warnings: false,
            drop_console: true
          },
          output: {
            comments: false,
            beautify: false,
            quote_keys: true
          },
          ie8: true
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.doc.env
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.doc.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
})

module.exports = webpackConfig