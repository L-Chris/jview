'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.build.productionSourceMap ? 'source-map' : false,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('index.js'),
    chunkFilename: utils.assetsPath('[id].[chunkhash].js'),
    library: 'jview',
    libraryTarget: 'umd'
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
      'process.env': config.build.env
    }),
    new es3ifyPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ]
})

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig