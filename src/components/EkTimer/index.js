import $ from '$'
import {moment} from '@/utils'
import template from './index.hbs'
import './index.scss'

class EkTimer {
  constructor (id, {endTime}) {
    this.$el = $(id)
    this.$number = null

    this.data = [
      {first: 0, second: 0, type: '天'},
      {first: 0, second: 0, type: '时'},
      {first: 0, second: 0, type: '分'},
      {first: 0, second: 0, type: '秒'}
    ]
    this.endTime = endTime
    this.timer = null
    
    this.init()
  }

  init () {
    let html = template(this.data)

    let $html = $(html)

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
      let data = this._generateData()
      this.update(data)
    }, 1000)
  }

  _generateData () {
    let leftTime = moment(this.endTime).diff(moment())
    return moment(leftTime).format('DDHHMMss').split('')
  }
}

export default EkTimer