# 零散知识点

## `Object.create()` 创建对象方式的特点以及用途

> - Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。  
> - 使用`Object.create(null)`创建的对象不含有`Object`原型上的方法，与`var a = { val: 1 }` 是不同的  
> - `Object.create(null)`用途为：你需要一个非常干净且高度可定制的对象当作数据字典的时候

```js
// 来看一个来自 MDN 的例子
const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
};

const me = Object.create(person);
me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
me.printIntroduction();
// "My name is Matthew. Am I human? true"
```

```js
/**
 * Object.create(null) 与 Object.create({}) 与 Object.create(Object.prototype)
 */

// 输出纯净的对象
Object.create(null, {
    a: {
        writable:true,
        configurable:true,
        value:'1'
    }
})

// 输出对象的 __proto__.__proto__ 上挂载了 Object 的方法
Object.create({}, {
    a: {
        writable:true,
        configurable:true,
        value:'1'
    }
})

// 输出对象的 __proto__ 上挂载了 Object 的方法
Object.create(Object.prototype, {
    a: {
        writable:true,
        configurable:true,
        value:'1'
    }
})
```

---
## `Object.defineProperty()` 基本语法
> Object.defineProperty(obj, prop, descriptor)
> - `obj` 要在其上定义属性的对象
> - `prop` 要定义或修改的属性的名称
> - `descriptor` 将被定义或修改的属性描述符
---
## 什么是amd、umd

---
## `reduce` 方法用法总结
> 两个字 `聚合`

---
## 数组字符串方法回忆

---
## 原型链与继承
> 每个构造函数（constructor）都有一个原型对象（prototype），原型对象都包含一个指向构造函数的指针，而实例（instance）都包含一个指向原型对象的内部指针

> 如果试图引用对象（实例instance）的某个属性，会首先在对象内部寻找改属性，直至找不到，然后再在对象的原型里（instance.prototype）里去找这个属性

## 二者区别 Array.apply(null, Array(x) ) and Array(x)

> Array 构造函数如果接收的是一个数字，他所作的就是给一个 array 的 length 赋值，并创建一个空数组，数组的被创建，length 属性有值，但数组不包含任何值
```js
Array(3);           // creates [], with a length of 3
```

> 或者 Array de constructor 接收多个参数
```js
Array(1,2,3);       // creates an array [1,2,3] etc
```

> apply 第一个参数为待绑定的this，但是传入 null，所以这里没用  
> 第二个参数，为需要传入的参数，但是这里传入了一个空数组 Array(3) ， 有意思的发生了，当 apply 接收到的是一个数组的时候，他其实发生的是：
```js
Array(undefined, undefined, undefined);        // [undefined, undefined, undefined]
```

---
## JS 中 new 操作符的意义
> 首先看一个`动态赋值`的例子
```js
function p() {
    this.name = 'Alan';
}
var a = {};

p.call(a);                         // 相当于调用 a.p()，而在p函数内，this会绑在a上，所以这个call会给a动态赋值name
console.log(a.name);
```

> new 的意义在于：
> - 创建一个新对象
> - 将构造函数的作用域赋值给新对象，即将`this`指向新对象
> - 执行构造函数中的代码（为新对象添加属性）
> - 返回新对象

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
var p1 = new Person('cj', '20');
console.log(p1.name);
console.log(p1.age);
console.log(p1 instanceof Person); // true

/* --------------------------------------------- */

/**
 * @param {Function} f 
 */
function New(f) {
    return function() { // 需要返回对象，构造器的实例
        var o = {'__proto__': f.prototype};
        f.apply(o, arguments); // o.f(arguments)，相当于给 o 赋值
        return o;
    }
}

var p2 = New(person)('xx', 18);
console.log(p2.name);
console.log(p2.age);
console.log(p2 instanceof Person);
Person.prototype.eg = 'xx';
console.log(p2.eg);                   // 'xx'
```

---
## bind()
[参考链接](https://hijiangtao.github.io/2017/05/07/Full-Usage-of-Apply-Call-and-Bind-in-JavaScript/)
> 区别与注意事项  
> 三个函数存在的区别, 用一句话来说的话就是: bind是返回对应函数, 便于稍后调用; apply, call则是立即调用. 除此外, 在 ES6 的箭头函数下, call 和 apply 的失效, 对于箭头函数来说:  
> - 函数体内的 this 对象, 就是定义时所在的对象, 而不是使用时所在的对象;
> - 不可以当作构造函数, 也就是说不可以使用 new 命令, 否则会抛出一个错误;
> - 不可以使用 arguments 对象, 该对象在函数体内不存在. 如果要用, 可以用 Rest 参数代替;
> - 不可以使用 yield 命令, 因此箭头函数不能用作 Generator 函数;

## 谈谈JS中类型转换的规则
[参考链接](https://javascript.ruanyifeng.com/grammar/conversion.html#)
> 转化规则可以分为`强制转换`与`自动转换`  
> 强制转换主要使用三种方法：`Number()`, `String` 和 `Boolean`，分别转化为数字字符串与布尔。  
> - `Number` 方法:
>   - 转化`number`、`string`类型的number和单个数值的数组为数字。
>   - 转化空字符串、null、false为0。转化其他均为·`NaN`。
>   - 相对于 parseInt而言是很严格的  
> - `String` 方法：
>   - 数值：相应字符串
>   - 字符串：不变
>   - 布尔值：'true' 或 'false'
>   - undefined: 'undefined'
>   - null: 'null'
>   - 对象：一般为 '[object object]', 本质上是依次调用对象自身的`toString`与`valueof`方法，一返回原始类型，则返回原始类型的string值，如果都没有返回原始类型，则报错。
> - `Boolean` 方法：可以将任意类型的值转化为布尔值
>   - `undefined`, `null`, `0`, `NaN`, `''` 均为 `false`，其余均为 `true`  

> 自动转化的规则：预期什么类型的值，就调用改类型的转换函数。
> - 自动转换，分为三种情况，他的转换规则是以强制转换为基础的
>   - 不同类型的数据相互计算
>   - 对非布尔值类型的数据求布尔值
>   - 对非数值类型的值使用一元运算（+ 和 -）

## 原始类型有几种？null是对象吗？基本数据类型与引用类型在存储上有什么差别
> - 原始类型：String,Number,Boolean,Null,Undefined,Symbol（原始数据类型不包括Object）  
> - null 不是对象，这个问题的由来是因为使用`typeof`方法检测null的时候，输出的值`object`。但我们使用`null instanceof Object`时，输出`false`，足以证明null不是对象。早期在JS的最初版本中，使用32位系统时，为了性能考虑使用低位存储了变量的类型信息，`000`对应的是`Object`，而null对应机器码的空指针，一般的操作系统中都是`000`，所以在判断类型的时候会有奇怪的`typeof null === object`。坦白的说，这是一个bug，但是在之后ECMA的提案中，修正这一bug的提案却被驳回，至此`typeof null === object`变成了一个永远不会被修复的bug或者说是特性。  
> - JS中的基本类型存放在栈中，数据大小确定，内存大小可以分配。引用类型存放在堆内存中，堆的特性是动态分类内存，大小不会自动释放。假设有一个变量object，变量实际保留的是一个指针，这个指针指向另一个位置。程序访问这个引用类型的object时，首先从栈中获取该对象的地址指针，然后再从堆内存中获取到所需的数据。基本类型与引用类型最大的区别在于传值与传址，都是基于这样的存储特点。按址传递，也就是引用传递，在开发中也很常见。有时候这种存储特点对代码逻辑造成影响时，我们需要使用常说到的深拷贝。深入内存原理来说，其实就是使用递归的方式，层层遍历对象进行复制，结果是在堆内存中重新开辟出一个空间存储新对象的值，然后新变量指向新开辟出的空间，从而实现引用的分离。

## JS中 == 与 === 的区别，什么时候使用 ==
> 简单概括，=== 用于判断两个值的类型与值是否全等，== 仅判断值，不判断类型。  
> === 比较好理解，除了 `NaN !== NaN`，== 不判断类型，是因为程序自动做了隐式转换然后在比较。但是其中会有一些直观上看起来奇怪的结果，比如：
>   - `null == false`  false
>   - `!null == true`  true
>   - `0 == false, 1 == true` true
>   - `2 == true`  false

> 可以看到，== 比较时，他的隐式转换也是有一定规律的。  
> 前者与后者如果类型相同，则与 === 的比较规则相同，如果类型不同，规则较多
>   - null 与 undefined 返回 true
>   - bolean 参与比较，boolean 将转换为 number 后进行全等比较
>   - number 与 string 比较，string转换为 number 进行全等比较
>   - 如果 x 是 number、string、symbol，y 是 对象，则返回对象经过 ToPrimitive 转换后的值与 x == 比较
>   - 其余返回都是 false

## 0.1 + 0.2 != 0.3
> 首先，JS是使用Number类型表示数字，遵循 IEEE754 标准，使用64位二进制来表示一个数字。  
> 第 0 位符号位，0 表示正数，1 表示负数  
> 第 1 位到第 11 位：存储指数部分 e  
> 第 12 位到第 63 位：存储小数部分（即有效数字）

> 所以 JS 的最大安全数是 2^53 -1，这里不是 2^52 是因为二进制有效数字第一位有默认的 1
> 我们知道计算机是不能直接进行10进制的运算，在计算时，需要进过两步，1、进制转换。2、对阶运算。拿 `0.1 + 0.2` 举例说明
>   - 进制转换，0.1 与 0.2 转化为二进制后会无限循环，但是由于 IEEE754 位数的限制，需要将后面的位数截断，这里会造成一次精度的损失。
>   - 对阶运算，由于指数为的位数不同，相加时需要进行对阶运算，这部分有可能产生精度的损失，两步之后，结果的二进制数转化成回十进制之后，会发现，结果是 `0.30000000000000004` (15个0)。总结一下，造成最终十进制相加结果的偏差根本原因是：`进制转化`与`对阶运算`过程中出现的精度损失。这种损失本质原因是`IEEE754`规范，不仅仅是JS语言层面的问题。java，ruby，python在处理小数是同样遵循的是 IEEE754 的浮点数。  
> 相似的问题还有 `1000000000000000128 === 1000000000000000129` 造成这样结果的原理都是一样的，`进制转化`与`对阶运算`精度的丢失

## 什么是闭包
> 回答这个问题之前，首先谈一下作用域。  
> 在JS中，没有块级作用域，就是说被`{}`包裹的代码块不能称之为作用域。JS具有的是函数作用域。  

> JS中没有动态作用域，比如一个函数只有一行代码：`console.log(a)`，而这时候有函数`f`首先`var a = 1`，然后调用函数这个函数，而当`f`执行的时候，会报错，`a`未定义。也就是说函数不能够在自己的执行环境中动态获取变量  

> 其实在JS中的作用域属于`静态作用域`，我们称之为`词法作用域`或`闭包`。解释一下就是，一个函数的作用域是在其声明的时候被确定的，而不是在被调用的时候动态变化的。  

> 接下来的一个概念是作用域链，这里讨论除了使用`new Function`创建的函数。作用域链的概念就是：函数的作用域可以理解为是以一个向上的链条方式存在的，如果在函数中使用一个变量，首先会在当前函数中寻找，如果没有，然后会在当前函数被声明的作用域中寻找，级级向上，直到window。这就是作用域链。  

> 在前面的概念基础上闭包的概念就很好解释了，闭包其实就是静态作用域与作用域链的综合体现。  

> 闭包是词法闭包的简称，是引用了自由变量的函数，这个被引用的自由变量将和这个函数一同存在，即使这个函数已经离开了创造他的环境，也就是被return出去。所以说闭包的产生有两个关键点，第一，在函数被创建时产生，第二，一旦被创建，他所引用的变量会一直与这个函数中存在不被销毁，即使这个函数被return出去，在其他地方调用

## 什么是原型与原型链
> 首先，明白原型与原型链，需要明白构造函数，构造函数的目的是为了创建一个自定义类，并且创建这个类的实例。构造函数是一个普通的函数，规定第一个首字母大写。并通过new关键字来调用。  

> 接下来说原型，在JS中每当定义一个函数的时候，都会天生自带一个`prototype`属性，这个属性指向函数的原型对象。原型对象就相当于一个公共的区域，所有实例都可以访问到这个原型对象。  

> 接下来说原型链，每个对象也天生自带一个属性`__proto__`，这个对象包括普通对象，实例，与prototype。`__proto__`的属性值指向当前实例所属类的`prototype`。原型对象中有一个属性`constructor`指向构造函数。在JS中万物都是对象，对象与对象之间是有关系的，并不是孤立存在的。对象之间的继承关系，是通过`prototype`对象指向父类对象，知道指向Object位置，这样就形成了一个原型指向的链条，称之为原型链。

## typeof 和 instanceof 的区别
> typeof 是一个一元运算，它返回值是一个字符串，该字符串说明运算数的类型。  
> typeof 一般只能返回如下几个结果："number"、"string"、"boolean"、"object"、"function" 和 "undefined"。  
> 在 JavaScript 中，判断一个变量的类型常常会用 typeof 运算符，在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 “object”。这就需要用到instanceof来检测某个对象是不是另一个对象的实例。  

> instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

## call，apply与bind的原理
> call与apply可以为函数指定执行上下文，传入指定参数，并执行函数，二者的区别在于参数传入的方式不同  
> bind方法，是改变当前调用bind方法的函数this指向，但是不会立即执行当前函数，而是返回一个新的函数。  

> call与apply的实现原理类似，都是在内部，先将传入的上下文对象绑定需要执行的方法，然后执行该方法，并传入需要的参数，执行完方法后，delete掉绑定在上下文上的方法，最后将执行结果return出去  
> bind方法执行后会返回一个函数，内部就是return出一个函数，在这个函数中，调用call的执行步骤，将需要绑定的this绑定，需要传入的参数传入

## 谈一谈js的执行上下文、执行栈与作用域
> 执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念，JavaScript 中运行任何的代码都是在执行上下文中运行。  
> 执行上下文分为三种类型：
>   - 全局执行上下文，默认的最基础的执行上下文，在这里，做了两件事，1、创建一个全局对象，比如在浏览器环境就是window对象。2、将this指针指向全局对象。
>   - 函数执行上下文，每当一个函数被调用，都会为该函数创建一个新的执行上下文，一个程序可以存在任意数量的函数执行上下文。
>   - Eval执行上下文，运行在eval函数中的代码也获得了自己的执行上下文。

> 由于js存在函数执行上下文，所以会有执行上下文栈来管理函数的执行上下文。遵循先进后出。
>   - JavaScript执行在单线程上，所有的代码都是排队执行。
>   - 执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
>   - 每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
>   - 全局上下文只有唯一的一个，它在浏览器关闭时出栈。

> JS的作用域分为全局作用域与函数作用域，函数的创建会创建闭包，在函数内部可以引用与访问这个函数创建时候的作用域中的变量，级级向上形成作用域链

## 数组乱序算法
> 参考 [数组乱序文章](https://blog.oldj.net/2017/01/23/shuffle-an-array-in-javascript/)  

```js
// 不要使用这种方法，这种随机在数组长度10以内与以外是不同的，且都不是等概率随机
function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}
```

```js
// 推荐使用Fisher–Yates shuffle，与lodash实现一致
function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
}
```

## Why use `Object.prototype.hasOwnProperty.call(obj, key)` rather than `obj.hasOwnProperty(key)` ？

> 虽然 `hasOwnProperty` 是 Object 原型对象上的方法，会继承给每一个Object实例，但是存在下面两种情况，obj 不会拥有或不拥有与其的 `hasOwnProperty` 方法
> - 通过 Object.create(null) 创建的对象，没有 prototype
> - 自定义了 hasOwnProperty 方法的对象

## 自定义 Promise.all 使其在遇到失败的 promise 后仍然走 resolve 并捕获到错误信息

> - 原理，自定义一个 transferdPromise 函数，使其在成功和失败后都返回值，也就是提前catch，然后使用 Promise.all 传入这个自定义 Promise 的数组

```js
let transferedPromises = (promises) => { // 返回一个处理之后的promise数组
    return promises.map(promise => {
        return promise.then(res => res).catch(err => err)
    })
}
let promiseArr = transferedPromises(promises)
Promise.all(promiseArr).then(resArr => {
    console.log(resArr)
})
```
