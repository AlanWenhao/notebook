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

### !! 两次取反
将一个值变为Boolean，效果与Boolean()一致
