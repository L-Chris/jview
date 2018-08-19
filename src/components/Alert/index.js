import Component from '@/components/Component'
import {noop} from '@/utils'
import template from './index.hbs'
import './index.scss'

let id = 0
const uid = () => id++

class Alert extends Component {
  constructor ({
    title,
    type,
    wait = 2500,
    closable = true,
    afterClose = noop
  } = {}) {
    super({
      data: {id: `ek-alert-${uid()}`, title, type, closable},
      template
    })

    this.wait = wait
    this.afterClose = afterClose.bind(this)

    this.render()
  }

  render () {
    this.$el = this.compile()

    $('.close', this.$el).click(() => this.destroyed())
    this.constructor.$body.append(this.$el)
    this.show()
    setTimeout(() => this.destroyed(), this.wait)
  }

  show () {
    this.$el.animate({ top: 56 }, 'swig')
  }

  hide () {
    this.$el.animate({ top: '-100%' }, 'swig', () => {
      this.$el.hide()
    })
  }

  destroyed () {
    if (!this.$el) return
    this.$el.animate({ top: '-100%' }, 'swig', () => {
      this.$el.remove()
      this.afterClose()
    })
  }
}

class AlertManager {
  constructor ({maxLength = 10} = {}) {
    this.instances = []
    this.maxLength = maxLength
  }

  create (params) {
    let item = new Alert(params)
    this.instances.push(item)
  }

  close (id) {
    let index = this.instances.findIndex(_ => _.id === id)
    if (index < 0) return
    this.instances.hide()
  }

  closeAll () {
    this.instances.forEach(_ => _.hide())
  }

  remove (id) {
    let index = this.instances.findIndex(_ => _.id === id)
    if (index < 0) return
    this.instances.splice(index, 1)
  }

  removeAll () {
    this.instances.forEach(_ => _.destroyed())
    this.instances = []
  }
}

export default new AlertManager ()