import $ from '$'
import EkComponent from '@/components/EkComponent'
import template from './index.hbs'
import {noop} from '@/utils'
import './index.scss'

class EkBreadcrumb extends EkComponent {
  constructor ({
    id,
    data,
    options: {
      handleClick = noop
    } = {}
  } = {}) {
    super({id, data, template})
    this.options = {handleClick: handleClick.bind(this)}

    this.render()
  }

  render () {
    const that = this
    let $html = this.compile()

    $('.ek-link', $html).click(function () {
      let {index} = this.dataset
      let route = that.data[index]

      that.options.handleClick(route)
    })

    this.$el.html($html)
  }
}

export default EkBreadcrumb