<template>
  <sky-up-reload class="sky-up-reload flex flex-row" :page.sync="pageInfo.page_num" @load="loadHandle">
    <div class="img-card" v-for="item in list" :key="item.id">
      <div class="btn">
        <el-button type="success" size="mini">添加</el-button>
        <el-button type="warning" size="mini">编辑</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini">预览</el-button>
      </div>
      <img v-lazy="item.url" data-parentclass="sky-up-reload">
    </div>
  </sky-up-reload>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      pageInfo: {
        page_size: 20,
        page_num: 1,
        total: 0
      },
      list: []
    };
  },
  created() {
    this.getImg()
  },
  methods: {
    getImg(fn){
      this.$apis.imgs.getImgsList({ type: '2', ...this.pageInfo }).then(res=>{
        this.list = res.data.list
        this.pageInfo.total = res.data.total
        fn && fn()
      })
    },
    loadHandle(fn){
      console.log(2);
      if((this.pageInfo.page_num - 1) * this.pageInfo.page_size < this.pageInfo.total){
        this.getImg(fn)
      }
    }
  }
};
</script>
<style lang="scss">
  .sky-up-reload {
    flex-wrap: wrap;
  }
  .img-card {
    padding: 4px;
    margin: 4px;
    border: 1px solid #eee;
    border-radius: 6px;
    width: 200px;
    height: auto;
    img {
      width: 200px;
      height: 250px;
    }
  }
</style>
