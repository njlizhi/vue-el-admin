import Vue from "vue"
import VueRouter from "vue-router"
// import HomeView from '../views/HomeView'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Main",
    // component: HomeView,
    component: () => import("../views/Main"),
    children: [
      // {
      //   path: "/home",
      //   name: "home",
      //   component: () => import("../views/home")
      // },
      // // {
      // //   path: "/home",
      // //   redirect: "/home"
      // //   // 重定向
      // // },
      // {
      //   path: "/user",
      //   name: "user",
      //   component: () => import("../views/user")
      // },
      // {
      //   path: "/mall",
      //   name: "mall",
      //   component: () => import("../views/mall/index.vue")
      // },
      // {
      //   path: "/page1",
      //   name: "page1",
      //   component: () => import("../views/other/pageOne.vue")
      // },
      // {
      //   path: "/page2",
      //   name: "page2",
      //   component: () => import("../views/other/pageTwo.vue")
      // }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue")
  }
]
/**
 * 解决报错问题：报错显示是路由重复
 * Error: Avoided redundant navigation to current location
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
