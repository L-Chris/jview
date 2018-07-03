'use strict'
const utils = require('./utils')
const autoprefixer = require('autoprefixer')
const config = require('../config')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin')

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
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loaders: [
        {
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'css-loader',
          options: {}
        },
        'style-loader', 'postcss-loader']
    }, {
      test: /\.scss$/,
      loaders: [
        {
          loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'css-loader',
          options: {}
        }, 'sass-loader', {
        loader: 'sass-resources-loader',
        options: {
          resources: ['./src/styles/vars.scss', './src/styles/mixins.scss']
        }
      }]
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader',
      query: {
        helperDirs: [resolve('src/handlebars/helpers')],
        partialDirs: [resolve('src/handlebars/partials')]
      }
    }]
  },
  plugins: [new es3ifyPlugin()],
  externals: {
    $: 'window.jQuery',
    handlebars: 'window.Handlebars'
  }
}