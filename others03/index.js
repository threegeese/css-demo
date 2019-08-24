import 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'

Vue.config.devtools = true

new Vue({
  el: '#app',
  data: {
    pages: ['#61f2f5', '#fec771', '#fa5477', '#a1dd70', '#d5a4cf'],
    currentIndex: 0,
    mouseActions: ''
  },
  methods: {
    pageMove (event) {
      console.log(event)
      if (event.deltaY > 0) {
        this.mouseActions = 'pages-down'
        if (this.currentIndex === this.pages.length - 1) {
          return
        } else {
          this.currentIndex += 1
        }
      } else if (event.deltaY < 0) {
        this.mouseActions = 'pages-up'
        if (this.currentIndex === 0) {
          return
        } else {
          this.currentIndex -= 1
        }
      }
    }
  }
})