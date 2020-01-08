import Layout from "@/layout/Layout.vue";
export default [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ '@/views/login/login.vue'),
  //   meta: {
  //     auth: false
  //   }
  // },
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
      }
    ]
  }
];
