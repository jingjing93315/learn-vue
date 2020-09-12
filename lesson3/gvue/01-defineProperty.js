// 数组响应式
//1.替换数组原型中7个方法
// 备份，修改备份
/**
 * 补充： Object.create()方法创建一个新的对象，使用现有的对象来提供
 * 新创建的对象的prototype
 */
const originalProto = Array.prototype;
const arrayProto = Object.create(originalProto);
["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function() {
    // 原始操作
    originalProto[method].apply(this, arguments);
    console.log("数组执行" + method + "操作");
    // 覆盖操作:通知更新
  }
})

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
  //判断传入的类型
  if (Array.isArray(obj)) {
    // 设置实例原型
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部元素执行响应化
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
function set(obj, key, val) {
  defineReactive(obj, key, val);
}
const obj = { foo: "foo", name: "一线蓝光", baz: { a: 1 }, arr: [1, 2, 3] };
observe(obj);
// defineReactive(obj, 'foo', 'foo')
// obj.foo;
// obj.foo = "战争与和平";

// obj.baz.a = 2;

// obj.baz = { a: 14 }
// obj.baz.a

// 动态添加，删除   乱入，不是响应式
// set(obj, 'dong', 'dong')
// obj.dong = '大静静'
// obj.arr;
obj.arr.push(4);
