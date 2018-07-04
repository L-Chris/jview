import template from './index.hbs'
import './index.scss'

const emmiter = $({})
let id = 0
const uid = () => id++

class EkTooltip {
  constructor ({message, position, parent} = {}) {
    this.$el = null
    this.data = {
      id: `ek-tooltip-${uid()}`,
      message,
      position
    }
    this.position = position
    this.parent = parent
    this.init()
  }

  init () {
    let html = template(this.data)
    this.$el = $(html)
    this.$el.fadeIn(200, () => {
      this.parent.append(this.$el);
      let pHeight = this.parent.innerHeight()
      let pWidth = this.parent.innerWidth()
      let selfHeight = this.$el.innerHeight()
      let selfWidth = this.$el.innerWidth()
      this.parent.css("position", "relative")
      switch(this.position) {
        case "right": 
          {
            this.$el.css({
              "top": pHeight/2 + selfHeight/2 + "px",
              "left": pWidth + 20 + "px",
              "margin-top": -selfHeight + "px"
            });
          }
          break;
        case "left": 
          {
            this.$el.css({
              "top": pHeight/2 + selfHeight/2 + "px",
              "right": pWidth + 20 + "px",
              "margin-top": -selfHeight + "px"
            });
          }
          break;
      }
    })
    
    
    this.parent.on("focus", "input", () => {
      this.destroyed()
    });
  }

  destroyed () {
    if (!this.$el) return
    this.$el.fadeOut(150, () => {
      this.$el.remove()
      emmiter.trigger('tooltip-destroyed', this.data.id)
    })
  }
}

class EkTooltipManager {
  constructor ({maxLength = 10} = {}) {
    this.list = []
    this.maxLength = maxLength

    emmiter.on('tooltip-destroyed', id => {
      this.remove(id)
    })
  }

  create (params) {
    let item = new EkTooltip(params)
    if (this.list.length >= this.maxLength) this.list.shift().destroyed()
    this.list.push(item)
  }

  remove (id) {
    let index = this.list.findIndex(_ => _.id === id)
    if (index < 0) return
    this.list.splice(index, 1)
  }

  clear () {
    this.list.forEach(_ => _.destroyed())
    this.list = []
  }
}

export default new EkTooltipManager ()