import $ from '$'
import EkComponent from '@/components/EkComponent'
import {moment} from '@/utils'
import template from './index.hbs'
import './index.scss'

class EkTimer extends EkComponent {
  constructor ({
    id,
    data = [
      {type: 'D', label: '天', data: [0, 0]},
      {type: 'H', label: '时', data: [0, 0]},
      {type: 'm', label: '分', data: [0, 0]},
      {type: 's', label: '秒', data: [0, 0]}
    ],
    endTime
  } = {}) {
    super({id, data, template})

    this.endTime = endTime
    this.$number = null
    this.timer = null
    this.render()
  }

  render () {
    let $html = this.compile()

    this.$number = $('.ek-timer-number', $html)
    this.$el.html($html)
    this.tick()
  }

  update (data) {
    this.$number.each(function (i, el) {
      if (el.innerText === data[i]) return
      el.innerText = data[i]
    })
  }

  tick () {
    this.timer = setInterval(() => {
      let data = this.constructor._generateData(this.options.endTime)
      this.update(data)
    }, 1000)
  }

  static _generateData (time) {
    let leftTime = moment(time).diff(moment())
    return moment(leftTime).format('DDHHMMss').split('')
  }
}

export default EkTimer