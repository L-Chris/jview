import $ from '$'
import template from './index.hbs'
import './index.scss'

class EkSwitchDistrict {
  constructor (id) {
    this.id = id
    this.$el = $(id)
    this.data = {
      typeList: [{id: 0, label: '省份', class: 'active'}, {id: 1, label: '城市'}],
      contentList: [{id: 0, label: '省份内容', class: 'active'}, {id: 1, label: '城市内容'}]
    }

    this.init()
  }

  init () {
    this.$el.hide()
    this.update(true)
  
    this.$el.click(e => e.stopPropagation())
    // 点击其他位置隐藏
    $(document).click(() => this.$el.hide())
  }

  update (first = false) {
    // 请求数据生成模板
    let html = template(this.data)
    this.$el.html(html)
     
    // 绑定事件
    let $tabItems = $('.ek-switch-district-tab-item', this.$el)
    let $tabContents = $('.ek-switch-district-tab-content', this.$el)

    // tab面板激活逻辑
    $tabItems.click(function () {
      let {type} = this.dataset
      
      let $this = $(this)
      $this.addClass('active')
        .siblings().removeClass('active')
      $tabContents
        .filter(`[data-type='${type}']`).addClass('active')
        .siblings().removeClass('active')
    })

    !first && $.nextTick(() => this.$el.show())
  }
}

export default EkSwitchDistrict