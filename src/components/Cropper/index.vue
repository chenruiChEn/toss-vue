<template>
  <div class="crop-wrappers">
    <el-row :gutter="20">
      <el-col :span="18">
        <vue-cropper
          class="img-container"
          ref="cropper"
          :view-mode="1"
          drag-mode="move"
          :zoomOnWheel="false"
          :auto-crop-area="0.5"
          :min-container-width="minWidth"
          :min-container-height="minHeight"
          :background="true"
          :rotatable="true"
          :src.sync="imgSrc"
          :ready="cropImage"
          :crop="cropImages"
          :preview="preview"
          :viewMode="viewMode"
          :cropBoxResizable="cropBoxResizable"
          alt="Source Image"
        >
        </vue-cropper>
        <div class="cropper-button">
          <el-button-group>
            <el-button
              size="mini"
              @click="changeScale(1)"
              type="primary"
              title="放大"
              ><i class="ylbIconfont">&#xe635;</i>
            </el-button>
            <el-button
              size="mini"
              @click="changeScale(-1)"
              type="primary"
              title="缩小"
              ><i class="ylbIconfont">&#xe62d;</i></el-button
            >
          </el-button-group>
          <el-button-group>
            <el-button
              size="mini"
              @click="move(0, -10)"
              type="primary"
              title="上移"
              ><i class="ylbIconfont">&#xe600;</i>
            </el-button>
            <el-button
              size="mini"
              @click="move(0, 10)"
              type="primary"
              title="下移"
              ><i class="ylbIconfont">&#xe602;</i>
            </el-button>
            <el-button
              size="mini"
              @click="move(-10, 0)"
              type="primary"
              title="左移"
              ><i class="ylbIconfont">&#xe611;</i>
            </el-button>
            <el-button
              size="mini"
              @click="move(10, 0)"
              type="primary"
              title="右移"
              ><i class="ylbIconfont">&#xe601;</i>
            </el-button>
          </el-button-group>
          <el-button-group>
            <el-button
              size="mini"
              @click="rotate(45)"
              type="primary"
              title="左旋45度"
              ><i class="ylbIconfont">&#xe63c;</i>
            </el-button>
            <el-button
              size="mini"
              @click="rotate(-45)"
              type="primary"
              title="右旋45度"
              ><i class="ylbIconfont">&#xe6ae;</i>
            </el-button>
          </el-button-group>
          <el-button-group>
            <el-button
              size="mini"
              @click="scaleX"
              type="primary"
              title="左右对调"
              ><i class="ylbIconfont">&#xe739;</i>
            </el-button>
            <el-button
              size="mini"
              @click="scaleY"
              type="primary"
              title="上下对调"
              ><i class="ylbIconfont">&#xe630;</i>
            </el-button>
          </el-button-group>
          <el-button-group>
            <el-button
              size="mini"
              @click="refreshCrop"
              type="primary"
              title="重置"
              ><i class="ylbIconfont">&#xe613;</i>
            </el-button>
            <!--<el-button size="mini" class="button-upload" type="primary" title="上传">-->
            <!--<i class="ylbIconfont">&#xe6c2;</i>-->
            <!--<input type="file" id="uploads" accept="image/png, image/jpeg, image/gif, image/jpg"-->
            <!--@change="uploadImg($event, 1)">-->
            <!--</el-button>-->
          </el-button-group>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import VueCropper from "./VueCropper";
export default {
  name: "sky-cropper",
  data: function() {
    return {
      model: false,
      modelSrc: "",
      cropImg: "",
      crap: false,
      previews: {},
      isScaleX: false,
      isScaleY: false,
      preview: ".img-preview",
      pImgWidth: 0,
      pImgHeight: 0
    };
  },
  props: {
    minWidth: {
      type: Number,
      default: 600
    },
    minHeight: {
      type: Number,
      default: 497
    },
    aspectRatio: {
      type: Number,
      default: 16 / 9 // 16/9 // 4/3  图片宽高比
    },
    imgSrc: {
      type: String,
      default:
        "https://bpic.588ku.com//back_origin_min_pic/19/07/03/8631e2998c1cf947f44a1f0bb545b4dd.jpg"
    },
    viewMode: {
      type: Number,
      default: 0
    },
    cropBoxResizable: {
      //裁剪框是否可缩放
      type: Boolean,
      default: true
    }
  },
  methods: {
    cropImages(v) {
      const { detail } = v;
      const { width, height } = detail;
      const that = this;
      that.pImgWidth = parseInt(width);
      that.pImgHeight = parseInt(height);
      that.cropImage();
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      let getImg = this.$refs.cropper.getCroppedCanvas();
      let imgs = getImg ? getImg.toDataURL() : "";
      this.cropImg = imgs;
      this.$emit("getCropperImg", imgs);
    },
    rotate(num) {
      // guess what this does :)
      this.$refs.cropper.rotate(num);
    },
    changeScale(num) {
      //放大 缩小
      this.$refs.cropper.relativeZoom(num);
    },
    move(num1, num2) {
      //上下左右移
      this.$refs.cropper.move(num1, num2);
    },
    scaleX() {
      //水平翻转
      let { isScaleX } = this;
      let num = 1;
      if (!isScaleX) {
        num = -1;
        this.isScaleX = true;
      } else {
        this.isScaleX = false;
      }
      this.$refs.cropper.scaleX(num);
    },
    scaleY() {
      //垂直翻转
      let { isScaleY } = this;
      let num = 1;
      if (!isScaleY) {
        num = -1;
        this.isScaleY = true;
      } else {
        this.isScaleY = false;
      }
      this.$refs.cropper.scaleY(num);
    },
    refreshCrop() {
      //重置
      this.$refs.cropper.reset();
    },
    uploadImg(e) {
      //重新上传图片
      const that = this;
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        that.$message("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();
      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        that.imgSrc = data;
        that.$refs.cropper.replace(data);
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
      this.refreshCrop();
    }
  },
  mounted: function() {},
  components: {
    VueCropper
  }
};
</script>

<style lang="scss">
.crop-wrappers {
  max-height: 500px;
  .img-container {
    max-height: 420px;
    overflow: hidden;
  }
  @font-face {
    font-family: "ylbIconfont"; /* project id 428349 */
    src: url("https://at.alicdn.com/t/font_428349_2pmgkk5l07eyu8fr.eot");
    src: url("https://at.alicdn.com/t/font_428349_2pmgkk5l07eyu8fr.eot?#iefix")
        format("embedded-opentype"),
      url("https://at.alicdn.com/t/font_428349_2pmgkk5l07eyu8fr.woff")
        format("woff"),
      url("https://at.alicdn.com/t/font_428349_2pmgkk5l07eyu8fr.ttf")
        format("truetype"),
      url("https://at.alicdn.com/t/font_428349_2pmgkk5l07eyu8fr.svg#ylbIconfont")
        format("svg");
  }
  .clearfix {
    clear: both;
  }
  .ylbIconfont {
    font-family: "ylbIconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .cropper-button {
    text-align: center;
    padding-bottom: 10px;
    .button-upload {
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    .button-upload #uploads {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
    .el-button-group {
      margin-top: 10px;
    }
  }

  .img-preview {
    float: left;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    overflow: hidden;
  }

  .img-preview > img {
    max-width: 100%;
  }

  .preview-lg {
    height: 9rem;
    width: 16rem;
  }

  .preview-md {
    height: 4.5rem;
    width: 8rem;
  }

  .preview-sm {
    height: 2.25rem;
    width: 4rem;
  }

  .preview-xs {
    height: 1.125rem;
    margin-right: 0;
    width: 2rem;
  }
}
</style>
