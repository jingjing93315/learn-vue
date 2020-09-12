// Object.defineProperty()
// 拦截： 对某个对象的某个key做拦截
function defineReactive(obj, key, val) {
  // 如果val是对象，需要递归处理
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key, val);
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
        console.log("set", key, val);
      }
    },
  });
}
// 循环遍历指定数据对象的每个key，并拦截
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
}
function set(obj, key, val) {
  defineReactive(obj, key, val);
}
const obj = { foo: "foo", name: "一线蓝光", baz: { a: 1 } };
observe(obj);
// defineReactive(obj, 'foo', 'foo')
// obj.foo;
// obj.foo = "战争与和平";

// obj.baz.a = 2;

// obj.baz = { a: 14 }
// obj.baz.a

// 动态添加，删除   乱入，不是响应式
set(obj, 'dong', 'dong')
obj.dong = '大静静'