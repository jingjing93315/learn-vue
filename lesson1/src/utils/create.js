import Vue from 'vue'
// Component- 组件配置对象
// props-传递给它的属性
function create(Component, props) {
    // const Ctor = Vue.extend(Component)   得到构造函数
    // new Ctor 得到实例
    var Comp = Vue.extend(Component)
    const comp = new Comp({
        propsData: props
    }).$mount()

    document.body.appendChild(comp.$el)
    comp.remove = ()=> {
        document.body.removeChild(comp.$el)
        comp.$destroy()
    }





//   //! 1.构建一个Component实例
//   const vm = new Vue({
//     render(h) {
//       // h是createElement函数
//       // 它可以返回一个虚拟dom -> vnode
//       return h(Component, { props });
//     },
//   }).$mount(); //不设置挂载目标，依然可以转换为vnode为真实节点 $el
//   //! 2. 挂载组件实例到body上
//   document.body.appendChild(vm.$el);

//   //! 3.获取组件实例
//   const comp = vm.$children[0]
//   comp.remove = () => {
//     document.body.removeChild(vm.$el);
//     vm.$destroy();
//   };
  return comp
}

export default create
