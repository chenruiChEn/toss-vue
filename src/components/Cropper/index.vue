<template>
  <el-dialog title="提示" :visible.sync="visible" top="2vh" width="90%">
    <div class="crop-wrappers">
      <el-row :gutter="20">
        <el-col :span="18">
          <vue-cropper
            class="img-container"
            ref="cropper"
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
            :viewMode="viewMode"
            :cropBoxResizable="cropBoxResizable"
            alt="Source Image"
          />
          <div class="cropper-button">
            <el-button-group>
              <el-button
                size="mini"
                @click="changeScale(1)"
                type="primary"
                title="放大"
              >
                <i class="iconfont icon iconfangda" />
              </el-button>
              <el-button
                size="mini"
                @click="changeScale(-1)"
                type="primary"
                title="缩小"
              >
                <i class="iconfont icon iconsuoxiao" />
              </el-button>
            </el-button-group>
            <el-button-group>
              <el-button
                size="mini"
                @click="move(0, -10)"
                type="primary"
                title="上移"
              >
                <i class="iconfont icon iconup" />
              </el-button>
              <el-button
                size="mini"
                @click="move(0, 10)"
                type="primary"
                title="下移"
              >
                <i class="iconfont icon icondown" />
              </el-button>
              <el-button
                size="mini"
                @click="move(-10, 0)"
                type="primary"
                title="左移"
              >
                <i class="iconfont icon iconleft" />
              </el-button>
              <el-button
                size="mini"
                @click="move(10, 0)"
                type="primary"
                title="右移"
              >
                <i class="iconfont icon iconright" />
              </el-button>
            </el-button-group>
            <el-button-group>
              <el-button
                size="mini"
                @click="rotate(45)"
                type="primary"
                title="左旋45度"
              >
                <i class="iconfont icon iconrotate" />
              </el-button>
              <!--<el-button-->
              <!--size="mini"-->
              <!--@click="rotate(-45)"-->
              <!--type="primary"-->
              <!--title="右旋45度"-->
              <!--&gt;<i class="ylbIconfont">&#xe6ae;</i>-->
              <!--</el-button>-->
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
            </el-button-group>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="docs-preview clearfix">
            <div class="img-preview preview-lg"></div>
          </div>
          <div style="clear:both;">
            尺寸： 宽{{ pImgWidth }}px 高{{ pImgHeight }}px
          </div>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import VueCropper from "./VueCropper";
import { uploadImg } from '@/api/modules/imgs'
export default {
  name: "sky-cropper",
  components: { VueCropper },
  data: function() {
    return {
      model: false,
      modelSrc: "",
      cropImg: "",
      crap: false,
      previews: {},
      isScaleX: false,
      isScaleY: false,
      pImgWidth: 0,
      pImgHeight: 0,
      cropperUrl: null,
      cropper: null
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
      default: ""
    },
    viewMode: {
      type: Number,
      default: 1
    },
    cropBoxResizable: {
      //裁剪框是否可缩放
      type: Boolean,
      default: true
    },
    visible: Boolean
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
    },
    confirm() {
      if (this.cropImg) {
        let toBlob = function(urlData, fileType) {
          let bytes = window.atob(urlData);
          let n = bytes.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bytes.charCodeAt(n);
          }
          return new Blob([u8arr], { type: fileType });
        }
        //将blob转换为file
        let blobToFile = function(theBlob, fileName) {
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        }
        const urlData = this.cropImg;
        const base64 = urlData.split(",").pop();
        const fileType = urlData
          .split(";")
          .shift()
          .split(":")
          .pop();
        // base64转blob
        const blob = toBlob(base64, fileType);
        let file = blobToFile(blob,`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}--${new Date().getTime()}.png`)
        uploadImg(file).then(res=>{
          this.$emit("handle",res);
        })
      }
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
  }
};
</script>

<style lang="scss">
.crop-wrappers {
  height: 80vh;
  .img-container {
    overflow: hidden;
  }
  .clearfix {
    clear: both;
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
.el-dialog__header,
.el-dialog__body,
.el-dialog__footer {
  padding: 10px;
}
.el-dialog__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
