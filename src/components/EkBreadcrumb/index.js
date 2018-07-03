import template from './index.hbs'
import './index.scss'

export default data => {
  let html = template(data)
  let $html = $(html)

  $('.ek-link', $html).click(function () {
    let {path} = this.dataset

    $.router.push({path}, {keepHash: false})
  })

  return $html
}