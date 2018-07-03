import $ from '$'
import template from './index.hbs'
import './index.scss'

class EkBackTop {
  constructor (id) {
    this.$el = $(id)
    
    this.init()
  }

  init () {
    const $window = $(window)
    const $body = $('html,body')

    let html = template()
    let $html = $(html)

    $window.scroll($.throttle(() => {
      let scrollTop = $window.scrollTop()
      if (scrollTop > 200) {
        this.$el.show()
      } else {
        this.$el.hide()
      }
    }, 200))
  
    this.$el.click(() => {
      $body.animate({
        scrollTop: 0
      }, 'fast', 'swing')
    })

    this.$el.html($html)
  }
}

export default EkBackTop