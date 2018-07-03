require('./styles/index.scss')
require('./plugins')($)

// export components
const files = require.context('./components/', true, /index\.js$/)
files.keys().forEach(key => {
  let name = key.replace(/(\.\/|\/index\.js)/g, '')
  exports[name] = files(key)
})