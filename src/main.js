import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./components";
import "normalize.css/normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/assets/font/iconfont.css'
import api from "./api";
Vue.use(api);
Vue.use(ElementUI);
Vue.config.productionTip = false;
import vueLazy from './common/lazyload'
Vue.use(vueLazy, {
  scrollDistance: 20
})
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
