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

## 另一种总结
1.当 `for-of` 循环开始，他将会调用这个方法（如果没有找到则会报错）
1.这个方法必须返回一个迭代器 —— 一个有 `next` 方法的对象
1.当 `for-of` 循环希望取得下一个数值，他就调用这个对象的 `next` 方法
1.`next()` 返回结构的格式必须是 `{ done: Boolean, value: any }`，当 `done=true` 迭代结束，否则 `value` 必须是一个未被迭代的新值。

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

比如，有个对象，range，要实现其可以被for-of循环：
```js
let range = {
    from: 1,
    to: 5,
}

range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current < this.last) {
                return { done: false, value: this.current ++ };
            }
            return { done: true };
        }
    }
}
for (let num of range) {
    console.log(num);
}

// 或者可以手动调用下面的next方法
const iter = range[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
```
上面的代码需要注意几点：
- range 自身没有next方法
- 相反，是调用 `range[Symbol.iterator]` 方法时候被创建的一个所谓“迭代器”对象，将会处理迭代操作
- 所以说 __迭代器是和迭代对象分离的__

理论上我们可以将他们合并，让 `range` 自身作为迭代器来简化代码。like this
```js
let range = {
  from: 1,
  to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return { done: false, value: this.current++ };
        } else {
            return { done: true };
        }
    }
};

for (let num of range) {
    alert(num); // 1, 然后 2, 3, 4, 5
}
```
现在 `range[Symbol.iterator]` 方法返回了 `range` 对象自身：包含了必须的 `next()` 方法并通过 `this.current` 记录了当前迭代的过程。有时候这样也是可以的。但是这样的缺点是，现在 `range` 对象只能承担一个 `for-of` 循环，如果代码中有两个地方同事对 `range` 进行循环，一个current显然不能处理。所以，将迭代器作为对象自身是不安全的。使用闭包的特性将迭代器与对象本身分离是常用的处理方式。

注意：
> 无穷迭代也是可行的。例如，range 设置为 `range.to = Infinity `则成为无穷迭代。或者我们可以创建一个可迭代对象，它生成一个伪随机数无穷序列。也是可用的。
> `next`没有什么限制，它可以返回越来越多的值，这也很常见.
> 当然，迭代这种对象的 `for..of` 循环将不会停止。但是我们可以通过使用 break 来打断它

# 字符串可迭代
数组和字符串是应用最广泛的内建课迭代对象
对于一个字符串， `for-of` 循环他的每个字符：
```js
for (let char of 'test') {
    console.log(char);
}
// t
// e
// s
// t
```

对于 utf-16 的扩展字符，也能正常工作
```js
let str = '𝒳😂';
for (let char of str) {
    alert( char );
}
// 𝒳
// 😂
```

## 显示调用迭代器
> 即 `const iter = something[Symbol.iterator]()` 然后通过程序自己控制决定什么时候执行 `iter.next()`  
是不是有想到 generator

## 可迭代对象和类数组对象
- 可迭代对象 `iterables` 是应用与 `Symbol.iterator` 方法的对象，像上文所述。
- 类数组对象 `Array-likes` 是具有索引和 `length` 属性的对象，所以他们很像数组

当然这些特性可以结合起来，比如字符串既是可迭代对象，又是类数组
但是一个可迭代对象也许不是类数组，一个类数组也可能不是可迭代对象
例如：上文中的 `range` 对象是可迭代的，但它不是类数组，下面的对象 `arrayLike` 是类数组，但却不可迭代：
```js
let arrayLike = { // 有索引和长度 => 类数组对象
  0: "Hello",
  1: "World",
  length: 2
};
```

有一个全局方法 `Array.from` 可以把它们全部结合起来。它以一个可迭代对象或者类数组对象作为参数，返回一个真正的 `Array` 数组。
```js
// 针对上文的range对象
let arr = Array.from(range);
console.log(arr); // 1,2,3,4,5 

let powArr = Array.from(range, num => num * num);
console.log(powArr); // 1,4,9,16,25
```

原生字符串的 `slice` 方法不支持 UTF-16 的字符集，调用会发生乱码，上文提到可迭代对象可以迭代这个字符集的字符串。那么试着封装一个新的 `slice`
```js
function slice(str, start, end) {
    return Array.from(str).clice(start, end).join('');
}
```

# 总结
可以应用 `for-of` 循环的对象称为 __可迭代的__ 。
- 技术上来说，可迭代对象必须实现方法 `Symbol.iterator`。
    - `obj[Symbol.iterator]` 的结果被称为迭代器。由它处理更深入的迭代过程。
    - 一个迭代器必须有 `next()` 方法，它返回一个 `{done: Boolean, value: any}`，这里 `done:true` 表明迭代结束，否则 `value` 就是下一个值。
- `Symbol.iterator` 方法会被 `for..of` 自动调用，但我们也可以直接调用.
- 内置的可迭代对象例如字符串和数组，都实现了 `Symbol.iterator`。
- 字符串迭代器能够识别 UTF-16 扩展字符。

