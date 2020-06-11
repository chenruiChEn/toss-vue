<template>
  <div>
   demo2
    <sky-demo :text="current" :types.sync="types" @handle="handle" ref="demo1" />
    <sky-demo2 :text="current" :types.sync="types" @handle="handle" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      current: 'fsdfs',
      types: 'fdsf'
    };
  },
  methods: {
    handle(text){
      console.log(text);
      this.current = text
      console.log(this.types);
    }
  }
};
</script>