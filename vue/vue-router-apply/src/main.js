import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

new Vue({
  name: 'main',
  router,
  render: h => h(App),
}).$mount('#app')

// vue 注册好之后要使用一个 router-view 来显示内容
