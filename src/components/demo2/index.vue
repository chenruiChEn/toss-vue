<template>
  <div @click="comfirm" class="bor">
    <p>组件二</p>
    {{text}}
    <p @click.stop="comfirm2">
      {{types}}
    </p>
    <button @click.stop="eventBtn">eventBus</button>
  </div>
</template>

<script>
import eventBus from '../../views/home/eventBus'
export default {
  name: "sky-demo2",
  props: {
    text: {
      type: [String, Number],
      default: null,
      required: false
    },
    types: {
      type: [String, Number],
      default: null
    }
  },
  methods: {
    //子传父 1
    comfirm(){
      this.$emit('handle',new Date().getTime())
    },
    //子传父 2  直接改变父组件数据，不需要父组件写监听函数  必须写  .sync
    comfirm2(){
      this.$emit('update:types', new Date().getTime())
      this.comfirm()
    },
    eventBtn(){
      eventBus.$emit('eventBus','event - ' + new Date().getTime())
    }
  }
};
</script>
<style>
  .bor {
    border: 1px solid #eee;
  }
</style>