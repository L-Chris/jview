import EkComponent from '@/components/EkComponent'
import template from './index.hbs'
import './index.scss'

class EkDialog extends EkComponent {
  constructor ({
    data: {
      title,
      content,
      close,
      next = ''
    } = {},
    option: {
      fn
    }
  } = {}) {
    super({
      data: {title, content, close, next},
      template
    })

    this.options = {fn}

    this.$content = null
    this.$close = null
    this.$next = null
  }

  render (params) {
    this.data = params
    this.$el = this.compile()

    this.$content = $('.ek-dialog-main-content', this.$el)
    this.$close = $('.close', this.$el)
    this.$next = $('.next', this.$el)

    this.$content.html(this.data.content)
    this.constructor.$body.append(this.$el)
  
    this.$close.click(() => this.hide())
    this.$next.click(() => {
      this.data.fn()
      this.hide()
    })
  }

  show () {
    this.$el.show()
  }

  hide () {
    this.$el.hide()
  }
}


export default new EkDialog ()