import EkComponent from '@/components/EkComponent'
import {noop} from '@/utils'
import {modalTypes} from '@/utils/const'
import template from './index.hbs'
import './index.scss'

const queue = []
let currentModal = null

class EkModalConstructor extends EkComponent {
  constructor ({
    type,
    title,
    subTitle,
    iconType,
    content,
    closable = true,
    visible = false,
    mask = true,
    maskClosable = false,
    confirmVisible = true,
    cancelVisible = true,
    confirmText = '确定',
    cancelText = '取消',
    confirmClass = 'status-info',
    cancelClass = 'border-info',
    resolve,
    reject,
    onConfirm = noop,
    onCancel = () => this.hide(),
    onClose = () => this.hide(),
    onHide = noop
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
    this.onConfirm = () => {
      onConfirm.apply(this)
      resolve('confirm')
    }
    this.onCancel = () => {
      onCancel.apply(this)
      resolve('cancel')
    }
    this.onClose = onClose.bind(this)
    this.onHide = () => {
      onHide.bind(this)
      currentModal = null
      showNext()
    }

    this.$content = null
    this.$contentBody = null
    this.$mask = null
    this.$cancel = null
    this.$confirm = null
    this.$close = null

    this.render()
  }

  render () {
    this.$el = this.compile()
    this.$content = $('.ek-modal-content', this.$el)
    this.$contentBody = $('.ek-modal-body', this.$el)
    this.$mask = $('.ek-modal-mask', this.$el)
    this.$cancel = $('[data-type=cancel]', this.$el)
    this.$confirm = $('[data-type=confirm]', this.$el)
    this.$close = $('.ek-modal-close', this.$el)

    this.maskClosable && this.$mask.click(() => this.hide())
    this.$cancel.click(() => this.onCancel())
    this.$confirm.click(() => this.onConfirm())
    this.$close.click(() => {
      this.onClose()
    })

    this.$contentBody.html(this.content)
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
    this.onHide()
  }

  remove () {
    this.$el.remove()
  }
}

const EkModal = options => {
  return new Promise((resolve, reject) => {
    queue.push({
      options,
      resolve,
      reject
    })

    showNext()
  })
}

EkModal.closeAll = () => {
  queue.forEach(_ => _.hide())
}
EkModal.removeAll = () => {
  queue.forEach(_ => _.remove())
}

// modal type
modalTypes.reduce((pre, _) => {
  pre[_.type] = options => EkModal(Object.assign({}, _, options))
  return pre
}, EkModal)

const showNext = () => {
  if (!queue.length) return
  if (currentModal) return
  let {options, resolve, reject} = queue.shift()
  options.resolve = resolve
  options.reject = reject
  currentModal = new EkModalConstructor(options)
  currentModal.show()
}

export default EkModal