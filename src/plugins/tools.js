import EkAlert from '@/components/EkAlert'
import EkDialog from '@/components/EkDialog'
import EkTooltip from '@/components/EkToolTip'
import {alertTypes} from '@/utils/const'

const compiled = {}

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
      pre[_.type] = function (title, options) {
        let params = Object.assign({title, type: _.type}, options)
        EkAlert.create(params)
      }
      return pre
    }, {}),
    dialog (params) {
      return EkDialog.show(params);
    },
    tooltip: (message, options) => {
      let params = Object.assign({message}, options)
      return EkTooltip.create(params);
    }
  })
}