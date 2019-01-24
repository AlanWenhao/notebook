# Iterator 遍历器
> 一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作

## 作用
- 为各种数据接口提供统一的，简单可访问的接口
- 是的数据结构成员能够按照某种次序排列
- Iterator 接口可以提供给es6新的循环语法 for-of 使用

## Iterator遍历的过程
1.创建一个指针对象，指向当前数据结构的起始位置，就是说遍历器本质就是一个指针对象
1.第一次调用指针对象的 `next` 方法，指针指向数据结构的第一个成员
1.第二次调用 `next` 方法，指针指向数据结构的第二个成员
1.不断调用 `next` 方法，直到它指向数据结构的结束为止，结束后`value`为`undefined`

## 模拟`next` 方法返回值
```js
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {done: true};
    }
  };
}
```

## Iterator 接口
ES6中原生具有Iterator接口的数据结构为：
    - Array
    - Map
    - Set
    - String
    - TypedArray
    - arguments
    - NodeList 对象

下面是数组的 `Symbol.iterator` 属性

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

而对象默认是没有 Iterator 接口的，因为对象的遍历顺序是不确定的需要开发者自己决定，但是我们可以给其添加 iterator 接口，使其可遍历。

```js
const obj = {
    [Symbol.iterator]() {
        return {
            next: function() {
                return {
                    value: 1,
                    done: true
                }
            }
        }
    }
}
// 此对象具有了 Iterator 接口，变成可遍历对象，但是遍历次数为1，因为第一次 done 就返回了 true
// 试试跟操作上面的数组一样，调用next方法
```

对象 prototype 上具有 Symbol.iterator 接口同样代表着对象可遍历

```js
class RangeIterator {
    constructor(start, stop) {
        this.value = start;
        this.stop = stop;
    }

    [Symbol.iterator]() { return this; }

    next() {
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return {done: false, value: value};
        }
        return {done: true, value: undefined};
    }
}

function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
    console.log(value); // 0, 1, 2
}
```



