import $ from '$'
import {noop} from '@/utils'

class EkComponent {
  static $window = $(window)
  static $body = $('body')

  constructor ({
    id,
    data = {},
    template = noop
  } = {}) {
    this.$el = id ? $(id) : null
    this.data = data
    this.template = template
  }

  compile (data = this.data) {
    let html = this.template(data)
    return $(html)
  }
}

export default EkComponent