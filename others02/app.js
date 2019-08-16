import 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'

// 持久本地存储
const STORAGE_KEY = 'TodoMVC'

const todoStorage = {
  fetch () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    return todos
  },
  save (todo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todo))
  }
}

new Vue({
  data: {
    todos: todoStorage.fetch(),
    newTodo: ''
  },
  watch: {
    todos: {
      handler (todo) {
        todoStorage.save(todo)
      },
      deep: true
    }
  },
  methods: {
    addTodo () {
      let value = this.newTodo && this.newTodo.trim()
      if (value) {
        this.todos.push({
          title: value
        })
        this.newTodo = ''
      }
      return
    }
  }
}).$mount('#app')