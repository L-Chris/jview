import EkComponent from '@/components/EkComponent'
import template from './index.hbs'
import './index.scss'

const emmiter = $({})
let id = 0
const uid = () => id++

class EkAlert extends EkComponent {
  constructor ({
    id = `ek-alert-${uid()}`,
    title,
    type,
    closable = true,
    wait = 2500
  }) {
    super({
      data: {id, title, type, closable},
      template
    })

    this.wait = wait
    this.$close = null

    this.render()
  }

  render () {
    this.$el = this.compile()
    this.$close = $('.ek-alert-close', this.$el)

    this.$close.click(() => this.destroyed())
    this.constructor.$body.append(this.$el)

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
    return item
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