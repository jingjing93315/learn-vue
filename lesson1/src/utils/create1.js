import Vue from 'vue'
import Notice from '@/components/Notice'
function create(Component, props){
    // 创建一个Vue新实例
    // const vm = new Vue({
    //     render(h){
    //         // render函数将传入组件配置对象转换为虚拟dom
    //         console.log(h(Component, {props}));
    //         return h(Component, {props})
            
    //     }
    // }).$mount() 
    // // 执行挂载工作，但是未指定挂载目标，表示只执行初始化工作

    // // 将生成的dom元素追加至body
    // document.body.appendChild(vm.$el)
    // const comp = vm.$children[0]
    // comp.remove = ()=> {
    //     document.body.removeChild(vm.$el)
    //     vm.$destroy()
    // }

    // extend实现
    var Comp = Vue.extend(Component)
    const comp = new Comp({
        propsData: props
    }).$mount()
    document.body.appendChild(comp.$el)
    comp.remove = ()=> {
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }
    return comp
}

export default {
    install(Vue){
        Vue.prototype.$notice = function(options){
            return create(Notice, options)
        }
    }
}