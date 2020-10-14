import Vue from 'vue'
import App from './App.vue'
import create from './utils/create'
import router from './jRouter'
import VueRouter from './jRouter/jvue-router'
import store from './store'
Vue.config.productionTip = false

// use会调用VueRouter.install(Vue)
Vue.use(VueRouter)
Vue.use(create)

Vue.prototype.$bus = new Vue()

new Vue({
  router, // 挂载 为什么要挂载？让我们可以在插件中访问到router实例
  store,
  render: h => h(App),
}).$mount('#app')
