require('./styles/index.scss')
const $ = require('$')
// install plugins
require('./plugins')($)

// export components
const files = require.context('.', true, /[^.]\/index\.js$/)
files.keys().forEach(key => {
  let name = key.replace(/(\.\/|\/index\.js)/g, '')
  exports[name] = files(key)
})