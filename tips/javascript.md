## JS零碎知识点

### 关于 document.querySelector

- document.querySelector('.class') 仅能选中第一个
- document.querySelectorAll('.class')选中所有

### 有关Javascript循环

1. for loop
2. for/in loop
3. for/of loop
4. for/await loop 

### object.keys(); IE 不支持

### array.some( callback(ele, index, array) ); 支持 IE9+

### 你不知道的JS，关于ES6+ [传送门](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md)

### JS进制的转化

[进制互转](http://www.topthink.com/topic/504.html)  
[JS对象转化原理之toString()与valueOf()](http://frontenddev.org/link/convert-the-tostring-the-valueof-javascript-object.html)
> 思考:  
> 1、将 0034 转化为 ‘34’  
> 2、将0.0004转化为 ‘0.0004’

### 那些不被我们熟知的 Object 方法，可以参看 MDN，这里只做简单陈述举例

```JS
Object.hasOwnProperty('x'); // 用来判断此对象的 this 上有没有直接挂载 x (方法/属性)
Object.getOwnPropertyNames(); // 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组,数组中的每一项是string

const arr = ["a", "b", "c"];
console.log(Object.getOwnPropertyNames(arr).sort()); // ["0", "1", "2", "length"]

var obj = { 0: "a", 1: "b", 2: "c"}; // 这里再尝试一个类数组对象
console.log(Object.getOwnPropertyNames(obj).sort()); // ["0", "1", "2"]
```

### export 与 import 的几种方式

```JS
// ex.js
export const name = 'Luke';
export const showName = () => {
    console.log(name);
}
const age = 19;
export default age;

// index.js 引入时
import { name, showName } from './ex';
import age from './ex';

------------------------------------------
// 另外还有批量导出，参考es6指南
export {
    name as name2,
    showName as showName2,
    age
}

// 导入时候批量导入
import {
    name2 as name3,
    showName2 as showName3,
    age
} from './ex';
```

### 由Promise引出的js任务队列
[参考链接](https://github.com/dwqs/blog/issues/61)
```js
new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(() => console.log(2));
    console.log(4)
}).then(t => console.log(t));
console.log(3);

// 输出 4 3 2 1
```
解释：任务可以分为同步任务，微异步任务，异步任务，看下题：

```js
console.log('script start');   //同步输出——1

setTimeout(function() {
  console.log('timeout1');   //异步宏任务，推入事件队列——5
}, 10);

new Promise(resolve => {
    console.log('promise1');   //同步输出——2
    resolve();   //同步执行 
    setTimeout(() => console.log('timeout2'), 10);   //异步宏任务，推入事件队列——6
}).then(function() {
    console.log('then1')     //异步微任务， 在执行队列之后，事件队列之前执行——4
})

console.log('script end');   //同步输出——3

// 程序从上到下，以此将不同性质的任务推入特定的队列
所以输出:
script start
promise1
script end
then1
timeout1
timeout2
```
### !! 两次取反
将一个值变为Boolean，效果与Boolean()一致

### Set 与 Map数据结构
Set：
- ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。Set 本身是一个构造函数，用来生成 Set 数据结构。
- 向Set加入值得时候，通过精确运算判断不同的值。即使JS中认为 null === null
- 两个对象总是不相等的！

Set的实例属性
- `Set.prototype.constructor` 构造函数，默认是 Set 函数
- `Set.prototype.size` 返回 Set 实例成员总数

Set实例方法
- 操作方法
    - `add(value)` 添加某个值，返回 Set 结构本身,支持链式添加，eg: s.add(1).add(2).add(3)
    - `delete(value)` 删除某个值，返回一个布尔值，表示删除是否成功
    - `has(value)` 返回一个布尔值，表示是否为Set的成员
    - `clear` 清楚所有成员，没有返回值
    - Array.from()方法可以将Set转化为数组，eg: Array.from(new Set([1,2,3,4]))
- 遍历方法
    - `keys()` 返回键名的遍历器
    - `values()` 返回键值得遍历器
    - `entries()` 返回键值对的**遍历器**
    - `forEach` 使用回调函数遍历每个成员
    - **特别指出，Set的遍历顺序就是插入顺序**
    - **由于Set结构没有键名只有键值，所以keys方法与values方法的行为完全一致**

### Set 遍历举例
```js
for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

// 由于entries方法返回遍历器，同时包含键名与键值，所以每次输出一个数组，两个成员完全西相同

// 其实set默认可遍历，它的默认遍历器生成函数就是values方法
Set.prototype[Symbol.iterator] === Set.prototype.values // true

let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

### Set结合扩展运算符...之后可以使用任意的数组方法，因此，实现交集、并集、差集
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

### 扩展运算符细节
> 复制对象自身的的可枚举属性  
> rest 剩余属性

```js
// 仅可以复制 可枚举属性（enumerable: true）
const car = {
  color: 'blue'
};

Object.defineProperty(car, 'type', {
  value: 'coupe',
  enumerable: false
});

console.log({...car});    // → {color: "blue"}

// 继承的属性即使是可枚举的也会被忽略，例如使用 Object.create 方式继承的对象

const car2 = Object.create(car, {
  type: {
    value: 'bmw',
    enumerable: true,
  }
})
console.log({...car2}); // { type: 'bmw' }

// 剩余参数 rest，数组对象一样适用，rest 必须出现在末尾
const arr = [10, 20, 30];
const [x, ...rest] = arr;
console.log(x);       // → 10
console.log(rest);    // → [20, 30]
```

### Promise 的finaly

> finaly 方法提供不论在promise成功与否都会进入的任务

```js
fetch('https://www.google.com')
  .then((response) => {
    console.log(response.status);
  })
  .catch((error) => { 
    console.log(error);
  })
  .finally(() => { 
    document.querySelector('#spinner').style.display = 'none';
  });
```

### 模板文字修订
> 可以接收函数逻辑

```js
function fn(string, substitute) {
  if(substitute === 'ES6') {
    substitute = 'ES2015'
  }
  return substitute + string[1];
}

const version = 'ES6';
const result = fn${version} was a major update;

console.log(result);    // → ES2015 was a major update
```
