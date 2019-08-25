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
      mouseActions: '',
      canMove: true
    }
  },
  template: `
    <transition-group :name="mouseActions" tag="div">
      <div class="page" v-for="(page, index) in pages" 
        v-show="index === currentIndex"
        :style="{'background-color': bgColor && bgColor[index] ? bgColor[index] : defaultColor }"
        @wheel="pageMove($event)"
        @transitionend="moveEnd"
        :key="index"
      >
        {{index}}
      </div>
    </transition-group>
  `,
  methods: {
    pageMove (event) {
      if (!this.canMove) return
      this.canMove = false
      if (event.deltaY > 0) {
        this.mouseActions = 'pages-down'
        if (this.currentIndex === this.pages - 1) {
          this.canMove = true
          return
        } else {
          this.currentIndex += 1
        }
      } else if (event.deltaY < 0) {
        this.mouseActions = 'pages-up'
        if (this.currentIndex === 0) {
          this.canMove = true
          return
        } else {
          this.currentIndex -= 1
        }
      }
    },
    moveEnd () {
      this.canMove = true
    }
  }
})

Vue.component('page-one', {
  data () {
    
  }
})

new Vue({
  el: '#app',
  data: {
    pages: 5,
    bgColor: ['#61f2f5', '#fec771', '#fa5477', '#a1dd70', '#d5a4cf'],
  }
})