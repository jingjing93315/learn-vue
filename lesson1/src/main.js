import Vue from 'vue'
import App from './App.vue'
import Notice from './utils/create1'
Vue.use(Notice)
Vue.config.productionTip = false


Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
