import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 100
  },
  getters: {
    newCount(state) {
      return state.count * 2;
    }
  },
  mutations: {
    change(state) {
      state.count += 10;
    }
  },
  actions: {
    // 这里传入的是 { commit } 原因在于初始化 actions 的时候 call 传入的参数是 this，也就是 Store 的实例
    change(aaa) {
      console.log(aaa);
    }
  }
})
