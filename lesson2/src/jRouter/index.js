import Vue from 'vue'
import VueRouter from './jvue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
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
    }
]

const router = new VueRouter({
    routes
})

export default router