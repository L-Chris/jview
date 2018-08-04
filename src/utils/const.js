export const alertTypes = [
  { type: 'success', class: 'success' },
  { type: 'warn', class: 'warn' },
  { type: 'danger', class: 'danger' }
]

export const modalTypes = [
  {
    type: 'info',
    confirmVisible: true,
    cancelVisible: false,
    confirmText: '知道了',
    confirmClass: 'info'
  },
  {
    type: 'success',
    confirmVisible: true,
    cancelVisible: false,
    confirmText: '知道了',
    confirmClass: 'info',
    iconType: 'smile',
    onConfirm () {
      this.hide()
    }
  },
  {
    type: 'error',
    confirmVisible: true,
    cancelVisible: false,
    confirmVisible: '知道了',
    confirmClass: 'error',
    iconType: 'info',
    onConfirm () {
      this.hide()
    }
  },
  { type: 'warning' },
  {
    type: 'confirm',
    confirmVisible: true,
    cancelVisible: true,
    confirmText: '确定',
    cancelText: '取消',
    onCancel () {
      this.hide()
    }
  },
  {
    type: 'tip',
    confirmVisible: false,
    cancelVisible: false
  }
]