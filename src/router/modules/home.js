import Layout from "@/layout/Layout.vue";
export default [
  {
    path: "/index",
    name: "home",
    component: Layout,
    meta: {
      title: "首页",
      icon: "home"
    },
    children: [
      {
        path: "/",
        name: "home",
        meta: {
          title: "首页",
          icon: "home"
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/index.vue")
      },
      {
        path: "/demo",
        name: "demo",
        meta: {
          title: "首页",
          icon: "demo"
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/demo.vue")
      },
      {
        path: "/demo2",
        name: "demo2",
        meta: {
          title: "首页2",
          icon: "demo2"
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/demo2.vue")
      }
    ]
  }
];
