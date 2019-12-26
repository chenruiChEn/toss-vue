// 引入Vue构造函数
import Vue from "vue";
/*
template
<div class="receivegoods-convention-container">
    <img v-for="(img,index) in imageList"
     data-parentclass="receivegoods-convention-container"
      v-lazy="img"
       :key="index" >
  </div>
--------------------------------------------------------------------
parentclass 父级元素class名  滚动的父级
v-lazy="url"
data-parentclass="parentclass"
 */
import imgUrls from '@/assets/down.gif'
var lazyload = {
  install(vue, payload) {
    Array.prototype.remove = function(item) {
      if (!this.length) return;
      var index = this.indexOf(item);
      if (index > -1) {
        this.splice(index, 1);
        return this;
      }
    };
    // 默认值图片
    var defaultImage = payload.defaultImage || imgUrls;
    var errorImage = payload.errorImage || imgUrls;
    // 默认离可视区10px时加载图片
    var distanece = payload.scrollDistance || 60;
    // 收集未加载的图片
    var listenList = [];
    // 收集已加载的图片
    var imageCacheList = [];

    // 是否已经加载完成的图片
    const isAlredyLoad = imageSrc => {
      return imageCacheList.indexOf(imageSrc) > -1;
    };

    //检测图片是否可以加载，如果可以则进行加载
    const isCanShow = item => {
      var ele = item.ele;
      var src = item.src;
      //图片距离页面顶部的距离
      var top = ele.getBoundingClientRect().top;
      //页面可视区域的高度
      var windowHeight = window.innerHeight;
      if (top - distanece < windowHeight && src && !isAlredyLoad(src)) {
        var image = new Image();
        image.src = src;
        image.onload = function() {
          ele.src = src;
          imageCacheList.push(src);
          listenList.remove(item);
        };
        image.onerror = function() {
          ele.src = errorImage;
          imageCacheList.push(src);
          listenList.remove(item);
        };
        return true;
      } else {
        return false;
      }
    };

    let timer = null;

    const onListenScroll = item => {
      let parent =
        document.querySelector("." + item.ele.dataset.parentclass) || window;
      parent.addEventListener("scroll", function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(function() {
          var length = listenList.length;
          for (let i = 0; i < length; i++) {
            isCanShow(listenList[i]);
          }
        }, 300);
      });
    };

    const addListener = (ele, binding) => {
      var imageSrc = binding.value;
      var item = {
        ele: ele,
        src: imageSrc
      };
      ele.src = defaultImage;
      if (isCanShow(item)) {
        return;
      }
      listenList.push(item);
      //然后开始监听页面scroll事件
      onListenScroll(item);
    };

    Vue.directive("lazy", {
      inserted: addListener,
      updated: addListener
    });
  }
};

export default lazyload;
