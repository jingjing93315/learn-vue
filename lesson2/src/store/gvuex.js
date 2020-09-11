
//1. 实现插件
let _Vue
class Store{
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions
        this._wrappedGetters = options.getters

        // 定义computed选项
        const computed = {}
        this.getters = {}// 给用户暴露对象
        const store = this
        Object.keys(this._wrappedGetters).forEach(key => {
            // 获取用户定于的getter
            const fn = store._wrappedGetters[key]
            // 转换为computed可以使用的无参数形式
            computed[key] = function (){
                return fn(store.state)
            }
            // 为getters定义只读属性
            Object.defineProperty(store.getters, key, {
                get: () => store._vm[key]
            })
            // _vm 中的数据有代理
        })

        // 创建响应式的数据state
        // this.$store.xx
        this._vm = new _Vue({
            data () {
                return {
                    // 不希望被代理 加上$
                    $$state: options.state
                }
            },
            // 没有参数的函数
            computed
        })

        // 修改this指向
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)

        // getters
        // this.getters = {}

    }

    get state (){
        return this._vm._data.$$state
    }
    

    set state(v) {
        // 只读
        console.error('please use replaceState to reset5 state')
    }
    // 修改state
    // this.$store.commit('add', 1)
    commit(type, payload) {
        // 获取type对应的mutations
        const entry = this._mutations[type] 
        if(!entry) {
            console.log('unknown mutation')
            return
        }
        // 传入state作为参数
        entry(this.state, payload)
    }

    dispatch(type, payload) {
          // 获取type对应的actions
          const entry = this._actions[type] 
          if(!entry) {
              console.log('unknown action')
              return
          }
          // 传入当前store实例作为参数(上下文)
          return entry(this, payload)
    }
}
function install(Vue){
    _Vue = Vue

    Vue.mixin({
        beforeCreate(){
            if(this.$options.store) {
                Vue.prototype.$store = this.$options.store 
            }
        }
    })
}
// 导出的对象是Vuex
export default {
    Store,
    install
}