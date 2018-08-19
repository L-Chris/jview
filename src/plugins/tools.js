import EkAlert from '@/components/Alert'
import EkModal from '@/components/Modal'
import EkTooltip from '@/components/ToolTip'
import {alertTypes} from '@/utils/const'

export default $ => {
  $.extend({
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
    modal: EkModal,
    tooltip: (message, options) => {
      let params = Object.assign({message}, options)
      return EkTooltip.create(params)
    }
  })
}