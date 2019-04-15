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
