import Vue from "vue"
import Vuex from "vuex"
import tab from "./tab"
import user from "./user"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [],

  //公共状态 任何一个组件都能访问到的
  state: {},
  getters: {},
  actions: {},
  //统一管理: 被devtools记录状态的修改
  mutations: {},

  modules: {
    tab,
    user
  }
})

//vuex 管理保存公共状态 （分散在各个组件内的状态，统一管理）

//vuex 持久化 -todo

//vuex 项目应用
// 1.非父子通信
// 2.后端数据的缓存快照，减少重复数据请求，减轻服务器压力，提高用户体验
