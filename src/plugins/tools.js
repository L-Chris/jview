import EkAlert from '@/components/EkAlert'
import EkModal from '@/components/EkModal'
import EkTooltip from '@/components/EkToolTip'
import {alertTypes, modalTypes} from '@/utils/const'

export default $ => {
  $.extend({
    nextTick (fn) {
      return setTimeout(fn, 0)
    },
    throttle (fn, wait) {
      let timer = null
      let previous = 0
      
      return function () {
        let now = Date.now()
        if (!previous) previous = now
        let remaining = wait - (now - previous)
        if (remaining <= 0) {
          fn()
          previous = now
        } else {
          clearTimeout(timer)
          timer = setTimeout(fn, remaining)
        }
      }
    },
    alert: alertTypes.reduce((pre, _) => {
      pre[_.type] = (title, options) => {
        return EkAlert.create(Object.assign({title, type: _.type}, options))
      }
      return pre
    }, {}),
    modal: modalTypes.reduce((pre, _) => {
      pre[_.type] = options => new EkModal(Object.assign({}, _, options))
      return pre
    }, {}),
    tooltip: (message, options) => {
      let params = Object.assign({message}, options)
      return EkTooltip.create(params);
    }
  })
}