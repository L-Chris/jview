import $ from '$'
import EkComponent from '@/components/EkComponent'
import template from './index.hbs'
import './index.scss'

class EkTooltip extends EkComponent {
  constructor ({
    title,
    placement,
    target
  } = {}) {
    super({data: {title, placement}, template})

    this.target = target
    this.render()
  }

  render () {
    this.$el = this.compile()

    this.$el.fadeIn(200, () => {
      this.target.append(this.$el)
      let pHeight = this.target.innerHeight()
      let pWidth = this.target.innerWidth()
      let selfHeight = this.$el.innerHeight()
      let selfWidth = this.$el.innerWidth()
      this.target.css('position', 'relative')
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
    
    $('input', this.target).focus(() => this.hide())
  }

  show () {
    this.$el.show()
  }

  hide () {
    this.$el.hide()
  }
}

export default EkTooltip