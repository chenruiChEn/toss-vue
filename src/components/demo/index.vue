<template>
  <div v-on:click="comfirm" class="bor">
    <p>组件一</p>
    {{text}}
    <p @click.stop="comfirm2">
      {{types}}
    </p>
    <p>
      eventName - {{eventName}}
    </p>
  </div>
</template>

<script>
  import eventBus from '../../views/home/eventBus'
  export default {
  name: "sky-demo",
    data(){
      return {
        eventName: ''
      }
    },
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
  },
  created(){
    console.log(this)
    console.log(this.$attrs)
    console.log(this.$listeners)
    eventBus.$on('eventBus',(e)=>{
      console.log(e);
      this.eventName = e
    })
  }
};
</script>
<style>
  .bor {
    border: 1px solid #eee;
  }
</style>