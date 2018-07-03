import {createFrame} from 'handlebars-utils'

export default function(array, options) {
  let data = createFrame(options, options.hash)
  const len = array.length
  let buffer = ''
  let i = -1

  while (++i < len) {
    let item = array[i]
    data.i = i
    data.key = i + 1
    data.total = len
    data.first = i === 0
    data.last = i === (len - 1)
    buffer += options.fn(item, {data: data})
  }
  return buffer
}