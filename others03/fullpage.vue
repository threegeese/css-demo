<template>
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
</template>

<script>
export default {
  data () {
    return {
      pages: ['#61f2f5', '#fec771', '#fa5477', '#a1dd70', '#d5a4cf'],
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
