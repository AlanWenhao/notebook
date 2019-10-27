# es6 类的编译原理

> 类其实就是一个函数，那么为什么这个函数能够 new 出新的对象呢？这个函数内部做了什么才能使得 new 出的实例拥有其原型上的方法与其静态方法呢？  
> 扩展，可以结合 `new` 的实现原理，来继续深入

## 注意几点
- es6只有静态方法，没有静态属性
- extends 关键字会继承父类的私有属性与共有方法，且可以继承静态方法
- 如果父类的 constructor 返回了一个引用类型，会把这个引用类型作为子类的 `this`，就是说，子类只会继承这个引用类型

## 
```js
let Parent = function() {
  function P() {

  }
  return P;
}()
Parent()
```
一般来说定义一个类 Parent 之后，没有使用 new 关键字而是直接调用 Parent() ，js 会抛出错误，但是上面的代码可以避免这一情况的发生。使得结果其实就是执行了 P 函数。
所以可以采用下面的方式来实现

```js
function _classCallCheck(instance, constructor) {
  if (!(instance instanceof constructor)) {
    throw new Error('Class constructor Child cannot be invoked without new');
  }
}
let Parent = function() {
  function P() {
    // 把this传进去，在调用的时候判断，this 是否是 P 的实例
    _classCallCheck(this, P);
  }
  return P;
}()
Parent()
```

解决了第一步之后，接下来是`继承父类的原型方法与静态方法的逻辑` 的方法 `_createClass`

```js
function _classCallCheck(instance, constructor) {
  if (!(instance instanceof constructor)) {
    throw new Error('Class constructor Child cannot be invoked without new');
  }
}
function _createClass(constructor, protoPropertys, staticPropertys) {
  if (protoPropertys.length > 0) {
    definePropertys(constructor.prototype, protoPropertys);
  }
  if (staticPropertys.length > 0) {
    definePropertys(constructor, staticPropertys)
  }
}
function definePropertys(target, arr) {
  for (let i = 0; i < arr.length; i ++) {
    Object.defineProperty(target, arr[i], arr[i].key, {
      ...arr[i], // 相当于定义：key: xxx, value: xxx
      configurable: true,
      enumerable: true,
      writable: true
    })
  }
}
let Parent = function() {
  function P() {
    // 把this传进去，在调用的时候判断，this 是否是 P 的实例
    _classCallCheck(this, P);
  }
  _createClass(
    P,
    [
      {
        key: 'eat',
        value: function() {
          console.log('eat');
        }
      },
      {
        key: 'drink',
        value: function() {
          console.log('drink');
        }
      }
    ],
    [
      {
        key: 'testStaticMethod',
        value: function() {
          console.log('testStaticMethod');
        }
      },
    ]
  )
  return P;
}()
Parent()
```
