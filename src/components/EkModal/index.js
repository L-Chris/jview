import EkComponent from '@/components/EkComponent'
import {noop} from '@/utils'
import template from './index.hbs'
import './index.scss'

class EkModal extends EkComponent {
  constructor ({
    title,
    content,
    closable,
    visible = false,
    mask = true,
    maskClosable = false,
    width = 520,
    confirmVisible = true,
    cancelVisible = true,
    confirmText = '确定',
    cancelText = '取消',
    onConfirm = noop,
    onCancel = () => this.hide()
  } = {}) {
    super({
      data: {
        title,
        closable,
        mask,
        confirmVisible,
        cancelVisible,
        confirmText,
        cancelText
      },
      template
    })

    this.visible = visible
    this.maskClosable = maskClosable
    this.onConfirm = onConfirm.bind(this)
    this.onCancel = onCancel.bind(this)

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

    this.$content.html(this.data.content)
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
  }

  destroy () {
    this.$el.remove()
  }
}


export default EkModal