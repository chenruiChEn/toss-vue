<template>
  <div class="home-main-box">
    <sky-cropper :imgSrc="cropperImg" />
    <sky-up-reload class="sky-up-reload flex flex-row" @load="loadHandle">
      <div class="img-card" v-for="item in list" :key="item.id">
        <div class="btn mb10">
          <el-checkbox v-model="item.checked" />
          <el-button type="warning" class="ml10" icon="el-icon-edit" size="mini" @click="cropperImg = item.url">编辑</el-button>
        </div>
        <img v-lazy="item.src" @click="prevImg = item.url" data-parentclass="sky-up-reload">
      </div>
    </sky-up-reload>
    <div class="car-btn flex flex-justcontent-center flex-alignitems-center">
      <i class="iconfont iconsky-file" />
      <span class="car-num" v-show="total">{{total}}</span>
    </div>
    <div v-if="prevImg" @click="prevImg = null" class="dialog-box flex flex-justcontent-center flex-alignitems-center">
      <img :src="prevImg" />
    </div>
    <!--<div v-if="cropperImg" @click="cropperImg = null" class="dialog-box flex flex-justcontent-center flex-alignitems-center">-->

    <!--</div>-->
  </div>

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
      dialogVisible: true,
      list: [],
      prevImg: null,
      cropperImg: null,
    };
  },
  computed: {
    total(){
      return this.list.filter(v=> v.checked).length
    },
    selected(){
      return this.list.filter(v=> v.checked)
    },
  },
  created() {
    this.getImg()
  },
  methods: {
    getImg(fn){
      this.$apis.imgs.getImgsList({ type: '2', ...this.pageInfo }).then(res=>{
        let list = res.data.list.map(v=>{
          v.src = v.url + '?x-oss-process=image/resize,m_pad,w_160'
          return v
        })
        if(this.pageInfo.page_num === 1){
          this.list = list;
        }else {
          this.list = this.list.concat(list)
        }
        this.pageInfo.total = res.data.total
        fn && fn()
      })
    },
    loadHandle(fn){
      this.pageInfo.page_num += 1
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
  .home-main-box {
    width: 100%;
    height: 100%;
  }
  .car-btn {
    position: fixed;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    bottom: 100px;
    right: 100px;
    overflow: hidden;
    background-color: #f4f4f4;
    cursor: pointer;
  }
  .car-num {
    position: absolute;
    right: 12px;
    top: 12px;
    padding: 4px 8px ;
    font-size: 14px;
    color: #ff704b;
    border-radius: 50%;
    background-color: #ffc258;
  }
  .iconsky-file {
    font-size: 40px;
  }
  .dialog-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.6);
    z-index: 999;
    transition: all 0.2s;
    > img {
      max-height: 90%;
    }
  }
  .img-card {
    padding: 4px;
    margin: 4px;
    border: 1px solid #eee;
    border-radius: 6px;
    width: 200px;
    height: auto;
    img {
      display: block;
      width: 160px;
      height: 220px;
      margin: 0 auto;
    }
  }
</style>
