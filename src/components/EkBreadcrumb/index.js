import $ from '$'
import EkComponent from '@/components/EkComponent'
import template from './index.hbs'
import './index.scss'

class EkBreadcrumb extends EkComponent {
  constructor ({
    id,
    data,
    onClick = route => $.router.push(route)
  } = {}) {
    super({id, data, template})

    this.onClick = onClick.bind(this)

    this.render()
  }

  render () {
    const that = this
    let $html = this.compile()

    $('.ek-link', $html).click(function () {
      let {index} = this.dataset
      let route = that.data[index]

      that.onClick(route)
    })

    this.$el.html($html)
  }
}

export default EkBreadcrumb