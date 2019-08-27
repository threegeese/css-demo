import 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'

Vue.config.devtools = true

// fullpage 全局组件
Vue.component('full-page', {
  props: {
    pages: {
      number: Number,
      required: true 
    },
    bgColor: {
      type: Array
    },
    defaultColor: {
      type: String,
      default: '#ffffc5'
    }
  },
  data () {
    return {
      currentIndex: 0,
      mouseActions: 'pages-down',
      canMove: true,
      endCount: 0,
      state: ''
    }
  },
  template: `
    <div @wheel="pageMove($event)">
      <transition-group :name="mouseActions" tag="div" @enter="enter" @leave="leave">
        <div class="page"
          v-for="(page, index) in pages"
          v-show="currentIndex === index"
          :style="{'background-color': bgColor && bgColor[index] ? bgColor[index] : defaultColor }"
          @transitionend="moveEnd"
          @enter="enter"
          @leave="leave"
          :key="index"
        >
          {{index}}
          <slot :state="state" :name="'slot' + index"></slot>
        </div>
      </transition-group>
    </div>
  `,
  methods: {
    pageMove (event) {
      if (!this.canMove) return
      this.canMove = false
      if (event.deltaY > 0) {
        this.mouseActions = 'pages-down'
        if (this.currentIndex === this.pages - 1) {
          this.canMove = true
          this.endCount = 0
          return
        }
        this.currentIndex += 1
      } else if (event.deltaY < 0) {
        this.mouseActions = 'pages-up'
        if (this.currentIndex === 0) {
          this.canMove = true
          this.endCount = 0
          return
        }
        this.currentIndex -= 1
      }
    },
    moveEnd () {
      this.endCount += 1
      if (this.endCount === 2) {
        this.canMove = true
        this.endCount = 0
        this.state = 'transitionend'
      }
    },
    // 当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调
    // 否则，它们将被同步调用，过渡会立即完成（这里使用 css 过渡，done 可以不执行）
    enter (el, done) {
      this.state = 'enter'
    },
    leave (el, done) {
      this.state = 'leave'
    }
  }
})

// 使用组件动态展示第一页
Vue.component('page-one', {
  props: ['state'],
  data () {
    return {
      html: 'A Vue Project'.split('').concat(['<br>', '{', '<br>'], 'return "Brad"'.split(''), ['<br>', '}']),
      codes: [],
      codeIndex: 0,
      isBlink: true,
      codeTimer: null,
      blinkTimer: null
    }
  },
  template: `
    <div class="page-one">
      <span v-for="code in codes" v-html="code"></span>
      <span v-show="isBlink">|</span>
    </div>
  `,
  watch: {
    state () {
      if (this.state === 'enter') {
        this.codeTimer = setInterval(this.addCodes, 200);
        this.blinkTimer = setInterval(this.startAnimation, 200);
      } else if (this.state === 'leave') {
        this.clear()
        this.codes = []
        this.codeIndex = 0
      } else {
        this.isBlink = false
      }
    }
  },
  methods: {
    addCodes () {
      this.codes.push(this.html[this.codeIndex])
      this.codeIndex += 1
    },
    startAnimation () {
      this.isBlink = !this.isBlink
      if (this.codeIndex === this.html.length) {
        this.clear()
      }
    },
    clear () {
      clearInterval(this.codeTimer)
      clearInterval(this.blinkTimer)
      this.codeTimer = null
      this.blinkTimer = null
    }
  }
})

new Vue({
  el: '#app',
  data: {
    pages: 5,
    bgColor: ['#61f2f5', '#fec771', '#fa5477', '#a1dd70', '#d5a4cf']
  }
})