import $ from '$'
import EkComponent from '@/components/EkComponent'
import template from './index.hbs'
import './index.scss'

class EkTooltip extends EkComponent {
  constructor ({
    data: {
      message,
      position
    } = {},
    $parent
  } = {}) {
    super({data, template})

    this.$parent = $parent
    this.render()
  }

  render () {
    this.$el = this.compile()

    this.$el.fadeIn(200, () => {
      this.$parent.append(this.$el)
      let pHeight = this.$parent.innerHeight()
      let pWidth = this.$parent.innerWidth()
      let selfHeight = this.$el.innerHeight()
      let selfWidth = this.$el.innerWidth()
      this.$parent.css('position', 'relative')
      switch(this.position) {
        case 'right': 
          this.$el.css({
            'top': pHeight / 2 + selfHeight / 2 + 'px',
            'left': pWidth + 20 + 'px',
            'margin-top': -selfHeight + 'px'
          })
          break
        case 'left': 
          this.$el.css({
            'top': pHeight / 2 + selfHeight / 2 + 'px',
            'right': pWidth + 20 + 'px',
            'margin-top': -selfHeight + 'px'
          })
          break
      }
    })
    
    $('input', this.$parent).focus(() => this.hide())
  }

  show () {
    this.$el.show()
  }

  hide () {
    this.$el.hide()
  }
}

export default EkTooltip