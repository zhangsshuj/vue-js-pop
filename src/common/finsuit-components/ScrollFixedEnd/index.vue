<!-- 浮动图表监听滚动隐藏容器组件 -->
<template>
  <section class='scroll-fixed-end-box'>
    <slot></slot>
  </section>
</template>

<script>

export default {
  props: {
    delay: {
      type: Number,
      default: 1000
    }
  },
  components: {},
  data () {
    return {
      t1: 0,
      t2: 0,
      timer: null
    };
  }, 
  created() {
    console.log('z-1')
  },
  mounted () {
    console.log('z-2')
    window.addEventListener("scroll", this.init);
  },
  activated () {
    // window.addEventListener("scroll", this.init);
  },
  //方法集合
  methods: {
    init () {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.isScrollEnd, this.delay);
      this.t1 = document.documentElement.scrollTop || document.body.scrollTop;
      this.$emit("scroll", this.t1);
    },
    isScrollEnd () {
      this.t2 = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.t2 == this.t1) {
        this.$emit("scrollEnd", this.t2);
      }
    }
  },
  deactivated () {
    // window.removeEventListener("scroll", this.init);
  },
  destroyed () {
    console.log('z-3')
    // window.removeEventListener("scroll", this.init);
  }
}
</script>
<style lang='less' scoped>
</style>