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
const entries = utils.findEntry(`${config.base.componentsSubDirectory}/*/index.js`)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: config.package.productionSourceMap ? 'source-map' : false,
  output: {
    library: 'jview',
    libraryTarget: 'umd',
    path: config.package.assetsRoot,
    publicPath: config.package.assetsPublicPath,
    filename: utils.assetsPath('[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('[id].[chunkhash].js')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            properties: false,
            warnings: false
          },
          output: {
            comments: false,
            beautify: false,
            quote_keys: true
          },
          ie8: true,
          sourceMap: true
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.package.env
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.package.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ]
})

if (config.package.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig