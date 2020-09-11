import Vue from 'vue'
import VueRouter from './gvue-router'
import Home from '../views/Home.vue'

// 1. use一下，VueRouter是一个插件
// 声明两个全局组件
Vue.use(VueRouter)

// 2. 声明一个路由表，url和内容的映射
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: ()=> import('../views/About.vue'),
        children: [
            {
                path: '/about/info',
                component: { render(h){return h('div','info page')} }
            }
        ]
    },
]
// 3. 创建一个Router实例
const router = new VueRouter({
    routes
})

export default router