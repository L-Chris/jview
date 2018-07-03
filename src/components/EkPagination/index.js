import $ from '$'
import {noop} from '@/utils'
import template from './index.hbs'
import './index.scss'

class EkPagination {
  constructor (id, data, { maxLength = 8, halfLength = maxLength / 2, handleClick = noop } = {}) {
    let html = template(data)
    let $html = $(html)

    this.$el = $(id)
    this.data = {
      page: 1,
      total: 1,
      totalElements: 0
    }
    this.options = {maxLength, halfLength, handleClick: handleClick.bind(this)}
    this.$total = $('.ek-pagination-total', $html)
    this.$prev = $('[data-page=prev]', $html)
    this.$next = $('[data-page=next]', $html)
    this.$quickprev = $('[data-page=quickprev]', $html)
    this.$quicknext = $('[data-page=quicknext]', $html)
    this.$page = $('.ek-pagination-item', $html)

    this.init(data, $html)
  }

  init (data, $html) {
    this.update(data, $html)
  
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

      this.options.handleClick(this.data)

      $.router.push({hash: {page}})
    })
  
    this.$el.html($html)
  }

  update (data, $el = this.$el) {
    if (!this.data.totalElements !== data.totalElements) this._updateTotal(data)
    if (this.data.page !== data.page || this.data.total !== data.total) {
      this._updatePrev(data)
      this._updateNext(data)
      this._updateQuickprev(data)
      this._updateQuicknext(data)
      this._updateItem(data, $el)
    }

    Object.assign(this.data, data)
  }

  trigger (data) {
    this.options.handleClick(data)
  }

  _correctPage (page) {
    page = parseInt(page)
    if (page < 1) page = 1
    if (page > this.data.total) page = this.data.total
    return page
  }

  _updateTotal (data) {
    this.$total.text(`共${data.totalElements}条记录`)
  }

  _updatePrev (data) {
    if (data.page === 1) {
      this.$prev.hide()
    } else if (this.data.page === 1) {
      this.$prev.show()
    }
  }

  _updateNext (data) {
    if (data.page === this.data.total) {
      this.$next.hide()
    } else if (this.data.page === this.data.total) {
      this.$next.show()
    }
  }

  _updateQuickprev (data) {
    if (data.total <= this.options.maxLength) return this.$quickprev.hide()

    if (data.page <= 4 && (this.data.page > 4 || !this.page)) {
      this.$quickprev.hide()
    } else if (data.page > 4 && (this.data.page <= 4 || !this.page)) {
      this.$quickprev.show()
    }
  }

  _updateQuicknext (data) {
    if (data.total <= this.options.maxLength) return this.$quicknext.hide()

    const point = this.data.total - 4
    if (data.page >= point && (this.data.page < point || !this.data.page)) {
      this.$quicknext.hide()
    } else if (data.page < point && (this.data.page >= point || !this.data.page)) {
      this.$quicknext.show()
    }
  }

  _updateItem ({total, page}, $el) {
    function _update ($el, page) {
      $el.text(page)
      $el.attr('data-page', page)
      $el.show()
    }

    this.$page.each((i, el) => {
      const $this = $(el)
      const id = parseInt($this.attr('data-id'))
      if (id === 1) return
      // 若为最后一页直接更新
      if (id === this.$page.length) return _update($this, total)

      let from
      if (page <= 4 || total <= this.options.maxLength) {
        from = 2
      } else if (page > total - 4) {
        from = total - 6
      } else {
        from = page - 2
      }

      let dataPage = from + i - 1

      if (dataPage >= total) return $this.hide()

      _update($this, dataPage)
    })

    $(`[data-page=${page}]`, $el).addClass('active')
    .siblings().removeClass('active')
  }
}

export default EkPagination