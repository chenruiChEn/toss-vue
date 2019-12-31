<template>
  <div class="app-wrapper">
    <div class="app-header">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b"
      >
        <template v-for="(item, index) in routes">
          <el-menu-item v-if="!item.hidden" :index="item.path" :key="index">
            <i class="el-icon-menu"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="app-main-box">
      <div class="app-main-title"></div>
      <div class="app-main-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "Layout",
  data() {
    return {
      routes: []
    };
  },
  created() {
    this.routes = router.options.routes;
  },
  methods: {}
};
</script>
<style lang="scss">
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .app-header {
    width: 200px;
    height: 100%;
    background-color: rgb(84, 92, 100);
    .el-menu {
      border: none;
    }
  }
  .app-main-box {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .app-main-title {
    height: 40px;
    border-bottom: 1px solid #eee;
  }
  .app-main-container {
    flex: 1;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
