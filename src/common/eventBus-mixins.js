import Vue from 'vue'
let eventBus = new Vue()
/**
 * 组件通讯，监听销毁事件
 * 组建必须有name
 */
export default {
  //监听
  mounted() {
    if (this.$options.name) {
      eventBus.$on(`${this.$options.name}`, this.ONDISPATCH)
    } else {
      console.error(`组建没有name, router ==> ${this.$route.path}`)
    }
  },
  //销毁
  beforeDestroy() {
    eventBus.$off(`${this.$options.name}`, this.ONDISPATCH)
  },
  methods: {
    ONDISPATCH(funName, param) {
      this[funName](param)
    },
    /**
     * 组件通讯，提交事件
     * @param {String} component    组件名称
     * @param {string} funName       目标组件的方法名
     */
    onEmit(component, funName, param) {
      eventBus.$emit(component, funName, param)
    }
  }
}
