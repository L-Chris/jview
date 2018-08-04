'use strict'
const utils = require('./utils')
const autoprefixer = require('autoprefixer')
const config = require('../config')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    alias: {
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      ...utils.generateStyleLoaders(),
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [resolve('src/handlebars/helpers')],
          partialDirs: [resolve('src/handlebars/partials')]
        }
      }
    ]
  },
  externals: {
    $: 'window.jQuery'
  }
}