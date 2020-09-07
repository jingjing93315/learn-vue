import Vue from 'vue'
import App from './App.vue'
import create from './utils/create'
Vue.config.productionTip = false

Vue.use(create)

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
