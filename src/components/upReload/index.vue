<template lang="html">
  <div
    class="co-up-reload"
    ref="loadMoudle"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    :style="{ transform: 'translate3d(0,' + top + 'px, 0)' }"
  >
    <slot />
    <div class="load-more">
      <slot name="load-more">
        <div class="moreData-tip" v-if="pullUpState == 1">
          <span class="moreData-tip-text">
            {{ pullUpStateText.moreDataTxt }}
          </span>
        </div>
        <div class="loadingMoreData-tip" v-if="pullUpState == 2">
          <span class="loadingMoreData-tip-text">
            {{ pullUpStateText.loadingMoreDataTxt }}
          </span>
        </div>
        <div class="noMoreData-tip" v-if="pullUpState == 3">
          <span class="connectingLine" />
          <span class="noMoreData-tip-text">
            {{ pullUpStateText.noMoreDataTxt }}
          </span>
          <span class="connectingLine" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "sky-up-reload",
  props: {
    loadStatus: {
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      top: 0,
      startY: 0,
      pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
      isLoading: false, // 是否正在加载
      pullUpStateText: {
        moreDataTxt: "上拉加载更多",
        loadingMoreDataTxt: "加载中...",
        noMoreDataTxt: "我是有底线的"
      },
      timer: null
    };
  },
  mounted(){
    this.$refs.loadMoudle.addEventListener('scroll',this.judgeScrollBarToTheEnd)
  },
  beforeDestroy(){
    this.$refs.loadMoudle.removeEventListener('scroll',this.judgeScrollBarToTheEnd)
  },
  methods: {
    // 判断滚动条是否到底
    judgeScrollBarToTheEnd() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let { scrollHeight, scrollTop, clientHeight } = this.$refs.loadMoudle;
        // 滚动条到底部的条件
        if (scrollHeight - scrollTop <= clientHeight + 50) {
          if (this.pullUpState !== 3 && !this.isLoading) {
            this.pullUpState = 1;
            this.loadHandle();
          }
        }
      }, 300);
    },
    loadHandle() {
      this.pullUpState = 2;
      this.isLoading = true;
      this.$emit("load", this.loadDone);
    },
    loadDone() {
      this.pullUpState = 0;
      this.isLoading = false;
    }
  },
  watch: {
    loadStatus(curVal) {
      this.pullUpState = curVal;
    }
  }
};
</script>

<style lang="scss">
.co-up-reload {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  flex: 1;
  .load-more {
    width: 100%;
    color: #c0c0c0;
    background: #f7f7f7;
  }
  .moreData-tip,
  .loadingMoreData-tip,
  .noMoreData-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .connectingLine {
    display: inline-flex;
    width: 150px;
    height: 2px;
    background: #ddd;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
