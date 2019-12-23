import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
Vue.use(Router);
const P404 = resolve =>
  require.ensure([], () => resolve(require("@/layout/404.vue")));

let routes = [
  {
    path: "/404",
    name: "404",
    component: P404,
    hidden: true,
    meta: {
      ignoreAuth: true
    }
  },
  {
    path: "*",
    component: P404,
    hidden: true,
    meta: {
      ignoreAuth: true
    }
  }
];
// 加载modules文件夹下的js文件
const routerContext = require.context("./modules", true, /\.js$/);

routerContext.keys().forEach(route => {
  const routerModle = routerContext(route);
  routes = [...(routerModle.default || routerModle), ...routes];
});

const router = new Router({
  // mode: 'history',
  mode: "hash",
  base: process.env.BASE_URL,
  routes: routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
    return;
  }
  if (to.path === "/") {
    next("/index");
  }
  if (to.meta.auth) {
    if (!store.state.user.token) {
      next("/login");
      return;
    }
  } else {
    next();
    return;
  }
  next();
});

export default router;
