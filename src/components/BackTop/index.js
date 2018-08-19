import $ from '$'
import Component from '@/components/Component'
import template from './index.hbs'
import './index.scss'

class BackTop extends Component {
  constructor ({id}) {
    super({id, template})

    this.render()
  }

  render () {
    const {$window, $body} = this.constructor
    let $html = this.compile()

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

export default BackTop