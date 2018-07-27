import EkComponent from '@/components/EkComponent'
import {noop} from '@/utils'
import template from './index.hbs'
import './index.scss'

class EkModal extends EkComponent {
  constructor ({
    type,
    title,
    subTitle,
    iconType,
    content,
    closable,
    visible = false,
    mask = true,
    maskClosable = false,
    confirmVisible = true,
    cancelVisible = true,
    confirmText = '确定',
    cancelText = '取消',
    confirmClass = 'info',
    cancelClass = 'border-info',
    onConfirm = noop,
    onCancel = () => this.hide(),
    afterClose = noop
  } = {}) {
    super({
      data: {
        type,
        title,
        subTitle,
        iconType,
        closable,
        mask,
        confirmVisible,
        cancelVisible,
        confirmText,
        cancelText,
        confirmClass,
        cancelClass
      },
      template
    })

    this.content = content
    this.visible = visible
    this.maskClosable = maskClosable
    this.onConfirm = onConfirm.bind(this)
    this.onCancel = onCancel.bind(this)
    this.afterClose = afterClose.bind(this)

    this.$content = null
    this.$mask = null
    this.$cancel = null
    this.$confirm = null
    this.$close = null
  
    this.render()
  }

  render () {
    this.$el = this.compile()
    this.$content = $('.ek-modal-body', this.$el)
    this.$mask = $('.ek-modal-mask', this.$el)
    this.$cancel = $('[data-type=cancel]', this.$el)
    this.$confirm = $('[data-type=confirm]', this.$el)
    this.$close = $('.ek-modal-close', this.$el)

    this.maskClosable && this.$mask.click(() => this.hide())
    this.$cancel.click(() => this.onCancel())
    this.$confirm.click(() => this.onConfirm())
    this.$close.click(() => this.hide())

    this.$content.html(this.content)
    this.$el.hide()
    this.constructor.$body.append(this.$el)
  }

  show () {
    this.$el.fadeIn(150)
    this.visible = true
  }

  hide () {
    this.$el.fadeOut(150)
    this.visible = false
    this.afterClose()
  }

  destroy () {
    this.$el.remove()
  }
}

class EkModalManager {
  constructor () {
    this.instances = []
  }

  create (params) {
    let modal = new EkModal(params)
    this.instances.push(modal)
    return modal
  }

  close (id) {
    let index = this.instances.findIndex(_ => _.id === id)
    if (index < 0) return
    this.instances.splice(index, 1)
  }

  closeAll () {
    this.instances.forEach(_ => _.hide())
  }

  remove () {
    let index = this.instances.findIndex(_ => _.id === id)
    if (index < 0) return
    this.instances.splice(index, 1)
  }

  removeAll () {
    this.instances.forEach(_ => _.destroyed())
    this.instances = []
  }
}

export default new EkModalManager()