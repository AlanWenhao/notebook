let arrayProto = Array.prototype;
let proto = Object.create(arrayProto);
['push','unshift','splice','reverse','sort','shift','pop'].forEach(method => {
  proto[method] = function(...args) {  
    let inserted;                               // 这个数组的方法也应该被监控
    switch (method) {
      case 'push':
        inserted = args;
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2)                                     // 数组的splice方法，只有传三个参数才有追加效果
      default:
        break;
    }
    console.log('视图更新');
    observerArray(inserted);
    arrayProto[method].call(this, ...args)
  }
})

function observerArray(obj) {
  for (let i = 0; i < obj.length; i ++) {
    let item = obj[i];
    observer(item);
  }
}

function observer(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) {                                          // 处理数组
    Object.setPrototypeOf(obj, proto);                               // 实现对数组方法的重写
    observerArray(obj)
  } else {
    for (let key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, value) {
  observer(value);
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (value !== newValue) {
        observer(newValue);
        value = newValue;
        console.log('视图更新');
      }
    }
  })
}

let data = {
  a: [ 1, 2, { name: 'alan' } ]
}
observer(data);
data.a.push({ age: 18 });
console.log('最终的数据', data);
