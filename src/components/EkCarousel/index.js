import EkComponent from '@/components/EkComponent'
import template from './index.hbs'
import './index.scss'

class EkCarousel extends EkComponent {
  constructor ({
    id,
    list,
    showIndicatros = false
  } = {}) {
    let groupCount = Math.ceil(list.length / 3)

    super({
      id,
      data: {
        list,
        showIndicatros,
        showArrow: groupCount >= 2
      },
      template
    })

    this.groupCount = groupCount
    this.$list = null
    this.$leftArrow = null
    this.$rightArrow = null
    this.render()
  }

  render () {
    let $html = this.compile()

    this.$list = $('.ek-carousel-list', $html)
    this.$leftArrow = $('.icon-arrow_left', $html)
    this.$rightArrow = $('.icon-arrow_right', $html)
    this.$listWrapper = $('.ek-carousel-wrapper', $html)

    this.$leftArrow.click(() => {
      let groupWidth = this.$listWrapper.width() + 16
      let left = parseInt(this.$list.css('left')) + groupWidth
      left = left >= 0 ? 0 : left
      this.$list.animate({
        left
      }, 'fast', 'swing')
    })
    this.$rightArrow.click(() => {
      let groupWidth = this.$listWrapper.width() + 16
      let left = parseInt(this.$list.css('left')) - groupWidth
      left = (left <= -this.groupCount * groupWidth) ? 0 : left
      this.$list.animate({
        left
      }, 'fast', 'swing')
    })

    this.$el.html($html)
  }
}

export default EkCarousel