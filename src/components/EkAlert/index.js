import template from './index.hbs'
import './index.scss'

const emmiter = $({})
let id = 0
const uid = () => id++

class EkAlert {
  constructor ({title, type, wait = 2500, close = true} = {}) {
    this.$el = null
    this.data = {
      id: `ek-alert-${uid()}`,
      title,
      type,
      close
    }
    this.wait = wait

    this.init()
  }

  init () {
    let html = template(this.data)
    this.$el = $(html)
    $('.close', this.$el).click(() => this.destroyed())
    $('body').append(this.$el)
    this.$el.animate({ top: 10 }, 'slow')
    setTimeout(() => this.destroyed(), this.wait)
  }

  destroyed () {
    if (!this.$el) return
    this.$el.animate({ top: '-100%' }, 'slow', () => {
      this.$el.remove()
      emmiter.trigger('alter-destroyed', this.data.id)
    })
  }
}

class EkAlertManager {
  constructor ({maxLength = 10} = {}) {
    this.list = []
    this.maxLength = maxLength

    emmiter.on('alter-destroyed', id => {
      this.remove(id)
    })
  }

  create (params) {
    let item = new EkAlert(params)
    if (this.list.length >= this.maxLength) this.list.shift().destroyed()
    this.list.push(item)
  }

  remove (id) {
    let index = this.list.findIndex(_ => _.id === id)
    if (index < 0) return
    this.list.splice(index, 1)
  }

  clear () {
    this.list.forEach(_ => _.destroyed())
    this.list = []
  }
}

export default new EkAlertManager ()