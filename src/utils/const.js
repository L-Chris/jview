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
    confirmVisible: '知道了',
    onConfirm () {
      this.hide()
    }
  },
  { type: 'success' },
  { type: 'error' },
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
  }
]