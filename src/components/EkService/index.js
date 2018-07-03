import $ from '$'
import template from './index.hbs'
import './index.scss'

class EkService {
  constructor (id) {
    this.$el = $(id)

    this.init()
  }

  init () {
    let html = template()
    let $html = $(html)
    
    $html
      .mouseenter(() => {
        $html.stop().animate({'margin-right': 0})
      })
      .mouseleave(() => {
        $html.stop().animate({'margin-right': -170})
      })

    this.$el.html($html)
  }
}

export default EkService