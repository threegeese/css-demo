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
    <div>
      <transition-group :name="mouseActions" tag="div">
        <div class="page"
          v-for="(page, index) in pages"
          v-show="currentIndex === index"
          :style="{'background-color': bgColor && bgColor[index] ? bgColor[index] : defaultColor }"
          @wheel="pageMove($event)"
          @enter="enter"
          @leave="leave"
          @transitionend="moveEnd"
          :key="index"
        >
          {{index}}
          <slot v-if="index === 0" :slotProps="state"></slot>
        </div>
      </transition-group>
    </div>
  `,
  methods: {
    pageMove (event) {
      if (!this.canMove) return
      this.canMove = false
      if (event.deltaY > 0) {
        if (this.currentIndex === this.pages - 1) {
          console.log(this.canMove)
          this.canMove = true
          this.endCount = 0
          return
        }
        this.currentIndex += 1
        this.mouseActions = 'pages-down'
      } else if (event.deltaY < 0) {
        if (this.currentIndex === 0) {
          this.canMove = true
          this.endCount = 0
          return
        }
        this.mouseActions = 'pages-up'
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
    enter (el, done) {
      console.log(el)
      this.state = 'enter'
      done()
    },
    leave (el, done) {
      this.state = 'leave'
      done()
    }
  }
})

// 使用组件动态展示第一页
Vue.component('page-one', {
  template: `
    <div class="page-one">
      <span v-html="code" v-for="code in codes"></span>
      <span v-show="isBlink">|</span>
    </div>
  `,
  data () {
    return {
      props: ['state'],
      html: 'A Vue Project'.split('').concat(['<br>', '{', '<br>'], 'return "Brad"'.split(''), ['<br>', '}']),
      codes: [],
      codeIndex: 0,
      isBlink: true,
      codeTimer: null,
      blinkTimer: null
    }
  },
  watch: {
    state () {
      if (this.this.state === 'enter') {
        this.codeTimer = setInterval(this.addCodes, 200);
        this.blinkTimer = setInterval(this.startAnimation, 200);
      } else if (this.this.state === 'leave') {
        this.clear()
        this.codes = []
        this.codeIndex = 0
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
    bgColor: ['#61f2f5', '#fec771', '#fa5477', '#a1dd70', '#d5a4cf'],
  }
})