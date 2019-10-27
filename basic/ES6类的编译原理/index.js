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
    Object.defineProperty(target, arr[i].key, {
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
const p = new Parent();
console.log(p);
p.eat();
p.drink();
Parent.testStaticMethod();
