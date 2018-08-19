import $ from '$'
import Component from '@/components/Component'
import {noop} from '@/utils'
import template from './index.hbs'
import './index.scss'

class Pagination extends Component {
  constructor ({
    id,
    page = 1,
    pageCount = 1,
    total = 0,
    pagerCount = 8,
    halfLength = pagerCount / 2,
    onClick = noop
  } = {}) {
    super({
      id,
      data: { page, pageCount, total },
      template
    })

    this.pagerCount = pagerCount
    this.halfLength = halfLength
    this.onClick = onClick.bind(this)

    this.$total = null
    this.$prev = null
    this.$next = null
    this.$quickprev = null
    this.$quicknext = null
    this.$items = null

    this.render()
  }

  render () {
    let $html = this.compile()

    this.$total = $('.ek-pagination-total', $html)
    this.$prev = $('[data-page=prev]', $html)
    this.$next = $('[data-page=next]', $html)
    this.$quickprev = $('[data-page=quickprev]', $html)
    this.$quicknext = $('[data-page=quicknext]', $html)
    this.$items = $('.ek-pagination-item', $html)
  
    $('ul', $html).click(e => {
      let {page} = e.target.dataset

      if (!page || this.data.page === parseInt(page)) return

      if (page === 'quickprev' || page === 'quicknext') return

      if (page === 'prev') {
        page = this.data.page - 1
      } else if (page === 'next') {
        page = this.data.page + 1
      }
  
      page = this._correctPage(page)
      this.update({...this.data, page})

      this.onClick(this.data)

      $.router.push({hash: {page}})
    })

    this.init()
    this.$el.html($html)
  }

  init () {
    this._updateTotal(this.data)
    this._updatePrev(this.data)
    this._updateNext(this.data)
    this._updateQuickprev(this.data)
    this._updateQuicknext(this.data)
    this._updateItem(this.data)
    this._updateVisible(this.data)
  }

  update (data) {
    if (this.data.total !== data.total) this._updateTotal(data)
    if (this.data.page !== data.page || this.data.pageCount !== data.pageCount) {
      this._updatePrev(data)
      this._updateNext(data)
      this._updateQuickprev(data)
      this._updateQuicknext(data)
      this._updateItem(data)
      this._updateVisible(data)
    }

    Object.assign(this.data, data)
  }

  _correctPage (page) {
    page = parseInt(page)
    if (page < 1) page = 1
    if (page > this.data.pageCount) page = this.data.pageCount
    return page
  }
  // 只有1页时隐藏
  _updateVisible (data) {
    if (data.pageCount <= 1) {
      this.$el.hide()
    } else {
      this.$el.show()
    }
  }

  _updateTotal (data) {
    this.$total.text(`共${data.total}条记录`)
  }

  _updatePrev (data) {
    if (data.page <= 1) {
      this.$prev.hide()
    } else if (this.data.page <= 1) {
      this.$prev.show()
    }
  }

  _updateNext (data) {
    if (data.page >= data.pageCount) {
      this.$next.hide()
    } else {
      this.$next.show()
    }
  }

  _updateQuickprev (data) {
    if (data.pageCount <= this.pagerCount) return this.$quickprev.hide()

    if (data.page <= 4) {
      this.$quickprev.hide()
    } else if (data.page > 4) {
      this.$quickprev.show()
    }
  }

  _updateQuicknext (data) {
    if (data.pageCount <= this.pagerCount) return this.$quicknext.hide()

    const pagerCount = this.data.pageCount - 4
    if (data.page >= pagerCount) {
      this.$quicknext.hide()
    } else if (data.page < pagerCount) {
      this.$quicknext.show()
    }
  }

  _updateItem ({pageCount, page}) {
    function _update ($el, page, visible = true) {
      $el.text(page)
      $el.attr('data-page', page)
      visible && $el.show()
    }

    this.$items.each((i, el) => {
      const $this = $(el)
      const id = parseInt($this.attr('data-id'))
      if (id === 1) return
      // 若为最后一页直接更新
      if (id === this.pagerCount) {
        if (pageCount === 1) {
          _update($this, 2, false)
          $this.hide()
          // 避免最后一页和第一页的data-page相同
        } else {
          _update($this, pageCount)
        }
        return
      }

      let from
      if (page <= 4 || pageCount <= this.pagerCount) {
        from = 2
      } else if (page > pageCount - 4) {
        from = pageCount - 6
      } else {
        from = page - 2
      }

      let dataPage = from + i - 1

      if (dataPage >= pageCount) return $this.hide()

      _update($this, dataPage)
    })

    this.$items.filter(`[data-page=${page}]`).addClass('active')
      .siblings().removeClass('active')
  }
}

export default Pagination