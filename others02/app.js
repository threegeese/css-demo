import 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'

Vue.config.devtools = true

// 持久本地存储 localStorage
const STORAGE_KEY = 'TodoMVC'
const todoStorage = {
  fetch () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach((todo, index) => {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save (todo) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todo))
  }
}

const app = new Vue({

  data: {
    todos: todoStorage.fetch(),
    newTodo: '',
    editingTodo: null
  },

  watch: {
    todos: {
      handler (todo) {
        todoStorage.save(todo)
      },
      deep: true
    }
  },

  computed: {
    allDone: {
      get () {
        return 1
      },
      set () {

      }
    }
  },

  methods: {
    addTodo () {
      let value = this.newTodo && this.newTodo.trim()
      if (value) {
        this.todos.push({
          title: value,
          isDone: false
        })
        this.newTodo = ''
      }
      return
    },

    editTodo (todo) {
      this.editingTodo = todo
    },

    doneEdit (todo) {
      this.editingTodo = null
    },
    
    cancelEdit (todo) {
      this.editingTodo = null

    },

    removeTodo (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    
    toggle (todo) {
      todo.isDone = !todo.isDone
    }
  },

  directives: {
    'todo-focus' (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }

}).$mount('#app')