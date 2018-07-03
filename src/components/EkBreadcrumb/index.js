import {noop} from '@/utils'
import template from './index.hbs'
import './index.scss'

class EkBreadcrumb {
  constructor (id, data, {handleClick = noop} = {}) {
    this.$el = $(id)
    this.data = data
    this.options = {handleClick: handleClick.bind(this)}

    this.render()
  }

  render () {
    let html = template(this.data)
    let $html = $(html)

    $('.ek-link', $html).click(function () {
      let {path} = this.dataset

      this.options.handleClick({path})
    })

    this.$el.html($html)
  }
}

export default EkBreadcrumb