import 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'

Vue.config.devtools = true

// import fullpage from './fullpage.vue'

// fullpage 全局组件
Vue.component('full-page', {
  data () {
    return {
      pages: ['#61f2f5', '#fec771', '#fa5477', '#a1dd70', '#d5a4cf'],
      currentIndex: 0,
      mouseActions: '',
      canMove: true,
      endCount: 0
    }
  },
  template: `
    <transition-group :name="mouseActions" tag="div">
      <div class="page" v-for="(page, index) in pages" 
        v-show="index === currentIndex"
        :style="{'background-color': page}"
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
        if (this.currentIndex === this.pages.length - 1) {
          this.canMove = true
          this.endCount = 0
          return
        } else {
          this.currentIndex += 1
        }
      } else if (event.deltaY < 0) {
        this.mouseActions = 'pages-up'
        if (this.currentIndex === 0) {
          this.canMove = true
          this.endCount = 0
          return
        } else {
          this.currentIndex -= 1
        }
      }
    },

    moveEnd () {
      this.endCount += 1
      if (this.endCount === 2) {
        this.canMove = true
        this.endCount = 0
      }
    }
  }

})

new Vue({
  el: '#app'
})