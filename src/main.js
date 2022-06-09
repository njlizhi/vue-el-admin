import Vue from "vue"
import App from "./App.vue"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/less/index.less"
import router from "./router"
import store from "./store"
//移动端rem适配文件
import axios from "axios"
import "@/api/mock.js"
import "@/assets/less/reset.less"
import Cleave from "cleave.js"
import "cleave.js/dist/addons/cleave-phone.cn"

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.directive("cleave", {
  inserted: (el, binding) => {
    let inputel = el
    if (el.tagName.toLowerCase() != "input") {
      inputel = el.querySelector("input")
    }
    inputel.cleave = new Cleave(inputel, binding.value || {})
  },
  update: el => {
    const event = new Event("input", { bubbles: true })
    setTimeout(function () {
      let inputel = el
      if (el.tagName.toLowerCase() != "input") {
        inputel = el.querySelector("input")
      }

      inputel.value = inputel.cleave.properties.result
      inputel.dispatchEvent(event)
    }, 100)
  }
})

router.beforeEach((to, from, next) => {
  store.commit("getToken")
  const token = store.state.user.token
  if (!token && to.name !== "login") {
    next({ name: "login" })
  } else if (token && to.name === "login") {
    next({ name: "home" })
  } else {
    next()
  }
})

new Vue({
  store, // 可以通过this.$store === store 访问到整个store
  router,
  render: h => h(App),
  created() {
    store.commit("addMenu", router)
  }
}).$mount("#app")
