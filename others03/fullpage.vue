<template>
  <transition-group :name="mouseActions" tag="div">
    <div class="page"
      v-for="(page, index) in pages" 
      v-show="index === currentIndex"
      :style="{'background-color': bgColor && bgColor[index] ? bgColor[index] : defaultColor }"
      @wheel="pageMove($event)"
      @transitionend="moveEnd"
      :key="index"
    >
      {{index}}
    </div>
  </transition-group>
</template>

<script>
export default {
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
      canMove: true,
      endCount: 0
    }
  },
  methods: {
    pageMove (event) {
      if (!this.canMove) return
      this.canMove = false
      if (event.deltaY > 0) {
        if (this.currentIndex === this.pages - 1) {
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
      // this.endCount 的意义是什么？
      this.endCount += 1
      if (this.endCount === 2) {
        this.canMove = true
        this.endCount = 0
      }
    }
  }
}
</script>

<style scoped>
#app { width: 100%; height: 100%; }
#app .page { width: 100%; height: 100%; position: absolute; }

/* 改变顺序试试 */
.pages-down-enter-active {
  transition: 1.2s all ease;
  transform: translateY(0);
}
.pages-down-enter {
  transform: translateY(100%);
}
.pages-down-leave {
  transform: translateY(0);
}
.pages-down-leave-active {
  transition: 1.2s all ease;
  transform: translateY(-100%);
}

.pages-up-enter-active {
  transition: 1.2s all ease;
  transform: translateY(0);
}
.pages-up-enter {
  transform: translateY(-100%);
}
.pages-up-leave {
  transform: translateY(0);
}
.pages-up-leave-active {
  transition: 1.2s all ease;
  transform: translateY(100%);
}
</style>
