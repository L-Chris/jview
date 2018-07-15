'use strict'
const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config')

exports.assetsPath = _path => {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.findEntry = _path => {
  let baseName, tmp, pathName
  
  return glob.sync(_path).reduce((pre, entry) => {
    baseName = path.basename(entry, path.extname(entry))
    pathName = `${entry.split('/').slice(-2, -1)}/${baseName}`
    pre[pathName] = entry
    return pre
  }, Object.create(null))
}

exports.generateStyleLoaders = () => {
  const isProd = process.env.NODE_ENV === 'production'
  let cssLoaders = ['css-loader', 'style-loader', 'postcss-loader']
  let scssLoaders = ['css-loader', 'postcss-loader', 'sass-loader', {
    loader: 'sass-resources-loader',
    options: {
      resources: ['./src/styles/vars.scss', './src/styles/mixins.scss']
    }
  }]

  let miniCssExtractLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {}
  }
  cssLoaders.unshift(miniCssExtractLoader)
  scssLoaders.unshift(miniCssExtractLoader)
  return [
    {
      test: /\.css$/,
      loaders: cssLoaders
    },
    {
      test: /\.scss$/,
      loaders: scssLoaders
    }
  ]
}