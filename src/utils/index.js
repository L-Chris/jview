export function isUndef (v) {
  return v === undefined || v === null
}

export const noop = () => {}

export const identity = _ => _

function isType (name) {
  return function (obj) {
    return toString.call(obj) === '[object ' + name + ']'
  }
}

export const isObject = isType('Object')
export const isArray = isType('Array')
export const isString = isType('String')

export const numberPrefix = (num, length, chars = '0') => {
  let res = ''
  num += ''
  let prefixLength = length - num.length
  if (prefixLength <= 0) return num
  for (let i = 0; i < prefixLength; i++) {
    res += chars
  }
  return res + num
}

// 对对象解析路径下的属性
const bailRE = /[^\w.$]/
export const parsePath = path => {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return obj => {
    for (let segment of segments) {
      if (!obj) return
      obj = obj[segment]
    }
    return obj
  }
}

// 遍历对象
export const forIn = (object, iteratee) => {
  let res = {}
  for (let key in object) {
    res[key] = iteratee(object[key], key)
  }
  return res
}

export const pluck = (collection, keys) => {
  keys = keys.split(',')
  return collection.map(_ => keys.reduce((pre, cur) => {
    pre[cur] = _[cur]
    return pre
  }, {}))
}

export const find = (collection, value, iteratee = identity) => {
  if (typeof iteratee === 'string') {
    iteratee = _ => _[iteratee]
  }

  let res = collection.filter(_ => iteratee[_] === value)
  return res
}

export const setTick = (fn, duration, first = true) => {
  first && fn()
  let id = setInterval(fn, duration)
  return () => clearInterval(id)
}

export const toMap = (collection, key) => {
  const res = new Map()
  for (let _ of collection) {
    res.set(_[key], _)
  }
  return res
}