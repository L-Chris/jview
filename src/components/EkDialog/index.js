import template from './index.hbs'
import './index.scss'

class EkDialog {
  constructor ({title, content, close, next = "", fn} = {}) {
    this.$el = null
    this.data = {
      title,
      content,
      close,
      next,
      fn
    }
  }

  show (params) {
    this.data = params;
    let html = template(this.data);
    this.$el = $(html);
    $('.ek-dialog-main-content', this.$el).html(this.data.content);
    this.$el.fadeIn(150, () => {
      $('body').append(this.$el)
    });
    $('.close', this.$el).click(() => this.destroyed())
    $('.next', this.$el).click(() => {
      this.data.fn();
      this.destroyed();
    })
  }

  destroyed () {
    if (!this.$el) return
    this.$el.fadeOut(150, () => {
      this.$el.remove()
    });
  }
}


export default new EkDialog ()