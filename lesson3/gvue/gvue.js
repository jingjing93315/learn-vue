// 实现GVue构造函数

function defineReactive(obj, key, val) {
  // 如果val是对象，需要递归处理
  observe(val);
  // 管家创建
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      // console.log("get", key, val);
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val;
    },
    set(newVal) {
      // 对形参赋值产生作用的原因 -   闭包
      /**
       * 形成了闭包
       * 有一个函数作用域内的一个变量，通过里边的一个函数暴露给外界的时候，
       * 形成了闭包，在内存中不会被释放，可以保存当前的运行状态。
       * 局部变量的存在， get函数返回了val，形成闭包
       */
      if (val !== newVal) {
        // 如果newVal是对象，也要响应式
        observe(newVal);
        val = newVal;
        // console.log("set", key, val);

        // watchers.forEach(w => w.update())
        // 通知更新
        dep.notify()
      }
    },
  });
}
// 循环遍历指定数据对象的每个key，并拦截
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // 每遇到一个对象，就创建一个Observer实例
  // 创建一个Observer实例去做拦截操作
  new Observer(obj);
}
// prox有代理函数，让用户可以直接访问data中的key
function proxy(vm, key) {
  Object.keys(vm[key]).forEach((k) => {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k];
      },
      set(v) {
        vm[key][k] = v;
      },
    });
  });
}
//根据传入value类型，做不同操作
class Observer {
  constructor(val) {
    this.value = val;
    // 判断value 类型
    // 遍历对象
    if(typeof value === 'object') {
      this.walk(this.value);
    } else {
      
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

// 创建一个
class Compile {
  // el-是宿主元素 vm-GVue实例
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;

    // 解析模板

    if (this.$el) {
      // 编译
      this.compile(this.$el);
    }
  }

  compile(el) {
    // el是宿主元素
    // 遍历它，判断当前遍历元素类型
    el.childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // console.log("编译元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 文本 {{xxxx}}
        // console.log("编译文本", node.textContent, RegExp.$1);
        this.compileText(node);
      }
      //递归
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }
  // 判断插值的表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // 编译文本
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }
  // 编译元素：分析指令 @事件
  compileElement(node) {
    // 获取属性并遍历之
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach((attr) => {
      // 指令： g-xxx = ‘yyy’
      const attrName = attr.name; // g-xxx
      const exp = attr.value; // yyy
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2); // xxx
        // 指令实际操作方法
        this[dir] && this[dir](node, exp);
      } else if(this.isEvent(attrName)) {
          const dir = attrName.substring(1)
          this.eventHandler(node, exp, dir)

      }
      // 处理事件 双绑 g-model值的赋值和监听
    });
  }

  eventHandler(node, exp, dir) {
      let method = this.$vm.$methods && this.$vm.$methods[exp]
      if(method && dir) {
        node.addEventListener(dir, method.bind(this.$vm))
      }
  }

  isDirective(attr) {
    return attr.indexOf("g-") === 0;
  }

  isEvent(attr) {
    return attr.indexOf('@') === 0
  }
  // 执行text指令对应的更新函数
  text(node, exp) {
    this.update(node, exp, "text");
  }
  // g-text 对应操作方法
  textUpdater(node, val) {
    node.textContent = val;
  }
  html(node, exp) {
    this.update(node, exp, "html");
  }
  htmlUpdater(node, val) {
    node.innerHTML = val;
  }

  model(node, exp) {
    this.update(node, exp, 'model');
    node.addEventListener('input', e => {
      this.$vm[exp] = e.target.value
    })
  }
  modelUpdater(node, val) {
      node.value = val
  }

  // 先提取update，初始化和更新函数的创建
  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    // 初始化
    fn && fn(node, this.$vm[exp]);
    // 更新
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val);
    });
  }
}

class GVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods
    observe(this.$data);
    // 1. 将data做响应式处理
    // 2. 为$data做代理
    proxy(this, "$data");
    // 3. 编译模版
    new Compile("#app", this);
  }
}

// const watchers = [];
// Watcher: 小秘书 跟视图中依赖1:1
class Watcher {
  constructor(vm, key, updaterFn) {
    this.vm = vm;
    this.key = key;
    this.updaterFn = updaterFn;

    // todo 依赖收集的触发
    // watchers.push(this);
    Dep.target = this
    this.vm[this.key] // 触发get
    Dep.target = null
  }

  update() {
    this.updaterFn.call(this.vm, this.vm[this.key]);
  }
}

// 管家：和某个key一一对应，管理多个秘书,数据更新时通知做更新工作
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }
// 发布订阅 触发和订阅是不是一个角色 观察者
  notify() {
    this.deps.forEach(watcher => watcher.update())
  }
}
