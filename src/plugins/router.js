import queryString from 'query-string'

const route = {
  query: queryString.parse(window.location.search),
  hash: queryString.parse(window.location.hash)
}
// 监听hashchange事件，处理手动修改hash的情况
$(window).on('hashchange', e => {
  route.hash = queryString.parse(window.location.hash)
})

export default $ => {
  $.extend({
    router: {
      push ({path = window.location.pathname, query = {}, hash = {}} = {}, {keepHash = true, keepQuery = true} = {}) {
        let newHash = queryString.stringify(
          keepHash ? Object.assign({}, $.route.hash, hash): hash
        )
        let newQuery = queryString.stringify(
          keepQuery ? Object.assign({}, $.route.query, query) : query
        )
        window.location.href = `${path}${newQuery}#${newHash}`
      },
      replace ({path = window.location.pathname, query = {}, hash = {}} = {}, {keepHash = true, keepQuery = true} = {}) {
        let newHash = queryString.stringify(
          keepHash ? Object.assign({}, $.route.hash, hash): hash
        )
        let newQuery = queryString.stringify(
          keepQuery ? Object.assign({}, $.route.query, query) : query
        )
        window.location.replace(`${path}${newQuery}#${newHash}`)
      }
    },
    route
  })
}