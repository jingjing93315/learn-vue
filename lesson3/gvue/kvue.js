function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  new Observe(obj);
}

function defineReactive(obj, key, val) {
  observe(val);

  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
        console.log(`get ${key}: ${val}`);
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal);
        val = newVal;
        console.log(`set ${key}: ${newVal}`);
        dep.notify();
      }
    },
  });
}

class KVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    observe(this.$data);

    proxy(this, "$data");
    new Compile("#app", this);
  }
}

class Observe {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

// 为$data做代理
function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        vm.$data[key] = newVal;
      },
    });
  });
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (this.isElement(node)) {
        console.log("编译元素" + node.nodeName);
        this.compileElement(node);
      } else if (this.isInterpolation(node)) {
        console.log("编译插值文本" + node.textContent);
        this.compileText(node);
      }

      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }
  isElement(node) {
    return node.nodeType === 1;
  }

  isInterpolation(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
  compileText(node) {
    // console.log(RegExp.$1);
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }
  compileElement(node) {
    let nodeAttrs = node.attributes;
    // v-html="desc"
    // name-> v-html value->desc
    Array.from(nodeAttrs).forEach((attr) => {
      let attrName = attr.name;
      let exp = attr.value;
      if (this.isDirective(attrName)) {
        let dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      }
    });
  }
  isDirective(attr) {
    return attr.indexOf("k-") == 0;
  }

  text(node, exp) {
    this.update(node, exp, "text");
    //   node.textContent = this.$vm[exp]
  }

  html(node, exp) {
    //   node.innerHTML = this.$vm[exp]
    this.update(node, exp, "html");
  }
  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]);
    new Watcher(this.$vm,exp, function(val) {
      fn && fn(node, val);
    });
  }

  textUpdater(node, val) {
    node.textContent = val;
  }

  htmlUpdater(node, val) {
    node.innerHTML = val;
  }
}

// 监听器：负责更新视图
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }
  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}
