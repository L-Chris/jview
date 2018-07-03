import {createFrame} from 'handlebars-utils'

export default function() {
  let length = arguments[0]
  let options = arguments[arguments.length - 1]
  let from = arguments.length > 2 ? arguments[1] : 0
  let to = from + length - 1
  let data = createFrame(options, options.hash)
  let buffer = ''
  let i = from - 2

  while (++i < to) {
    data.i = i + 1
    data.key = i
    data.total = length
    data.first = i === from
    data.last = i === to
    buffer += options.fn(i, {data: data})
  }
  
  return buffer
}