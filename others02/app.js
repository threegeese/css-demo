import 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'

// // 持久本地存储
// const STORAGE_KEY = 'TodoMVC'

// const todoStorage = {
//   fetch () {
//     let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
//     todos.forEach((todo, index) => {
//       todo.id = index
//     })
//   },
//   save (todo) {

//   }
// }

new Vue({
  data: {
    newTodo: ''
  },
  methods: {
    addTodo () {
      
    }
  }
}).$mount('#app')