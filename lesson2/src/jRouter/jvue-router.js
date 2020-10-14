import View from './jrouter-view'
import Link from './jrouter-link'
let Vue // 引用构造函数，VueRouter中要使用

class VueRouter {
    constructor(options){
        this.$options = options

        // 缓存path和route映射关系
        this.routerMap = {}
        this.$options.routes.forEach(route=> {
            this.routerMap[route.path] = route
        })


        // current 设置成响应式的
        // Vue.util.defineReactive(this, 'current', '/')

        const initial = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'current', initial)


        window.addEventListener('hashchange', this.onHashChange.bind(this))
        window.addEventListener('load', this.onHashChange.bind(this))
    }
    onHashChange(){
        this.current = window.location.hash.slice(1)
    }

}

VueRouter.install = function(_Vue){
    Vue = _Vue
    //挂载$router
    // 为什么用混入，主要原因是use代码在前，router实例创建在后，install逻辑需要用到这个实例
    Vue.mixin({
        beforeCreate(){
            // 只有根组件拥有router选项
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    Vue.component('router-link', Link)
    Vue.component('router-view', View)
}

export default VueRouter