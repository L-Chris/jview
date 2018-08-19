import $ from '$'
import Component from '@/components/Component'
import {noop, numberPrefix} from '@/utils'
import template from './index.hbs'
import './index.scss'

class Timer extends Component {
  constructor ({
    id,
    endTime,
    afterEnd = noop
  } = {}) {
    super({
      id,
      data: [
        {type: 'D', label: '天', data: [0, 0]},
        {type: 'H', label: '时', data: [0, 0]},
        {type: 'm', label: '分', data: [0, 0]},
        {type: 's', label: '秒', data: [0, 0]}
      ],
      template
    })

    this.endTime = endTime
    this.afterEnd = afterEnd.bind(this)
    this.timer = null

    this.$number = null
    this.render()
  }

  render () {
    let $html = this.compile()
    this.$number = $('.ek-timer-number', $html)
    this.tick()
    this.$el.html($html)
  }

  update (data) {
    this.$number.each(function (i, el) {
      if (el.innerText === data[i]) return
      el.innerText = data[i]
    })
  }

  tick () {
    this.timer = setInterval(() => {
      let data = this._generateData(this.options.endTime)
      this.update(data)
    }, 1000)
  }

  clearTick () {
    if (!this.timer) return
    clearInterval(this.timer)
    this.afterEnd()
  }

  _generateData () {
    let str = ''
    let leftTime = parseInt((this.endTime - new Date()) / 1000)
    if (leftTime <= 0) {
      this.clearTick()
      leftTime = 0
    }
    for (let divisor of [86400, 3600, 60, 1]) {
      str += numberPrefix(parseInt(leftTime / divisor), 2)
      leftTime = leftTime % divisor
    }
    return str.split('')
  }
}

export default Timer