import View from './grouter-view'
// 实现一个插件
// 返回一个函数
// 或者返回一个对象，有install方法
let _Vue;
class VueRouter {
  // 选项 routes - 路由表
  constructor(options) {
    this.$options = options;

    // 缓存path和route的映射关系
    // this.routeMap = {}
    // this.$options.routes.forEach(
    //   route => {
    //     this.routeMap[route.path] = route
    //   }
    // );
    

    // _Vue
    console.log(_Vue)
    // 定义一个响应式的current属性
    // const initial = window.location.hash.slice(1) || "/";
    // 官方提供的隐藏API
    // _Vue.util.defineReactive(this, "current", initial);
    // 监控url变化
    this.current = window.location.hash.slice(1) || '/'
    _Vue.util.defineReactive(this, 'matched', [])
    // match 方法可以递归的遍历，获得匹配关系的数组
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }

  onHashChange() {
    // 只要/#后面部分 current本身不是响应式的
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()

  }

  match(routes) {
    routes = routes || this.$options.routes
    // 递归遍历
    for (const route of routes) {
      if(route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      // /about/info 
      if(route.path !== '/' && this.current.indexOf(route.path) != -1){
        this.matched.push(route)
        if(route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }
}
// 静态方法
VueRouter.install = function(Vue) {
  // 引用Vue的构造函数,在上面的VueRouter中使用  避免增加打包体积
  _Vue = Vue;
  // 1. 挂载$router
  Vue.mixin({
    // 全局混入
    beforeCreate() {
      // 此处的this指的是组件的实例
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  // 2. 定义两个全局组件router-link, router-view
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        require: true,
      },
    },
    render(h) {
      // <router-link to="/about"></router-link>
      // 默认插槽的内容 <a href="#/about">xxxx</a>
      return h(
        "a",
        {
          attrs: {
            href: "#" + this.to,
          },
        },
        this.$slots.default
      );
    },
  });
  Vue.component("router-view", View);
};
export default VueRouter;