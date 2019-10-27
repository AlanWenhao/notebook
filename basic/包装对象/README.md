# 包装对象

## 定义
对象是 JavaScript 语言最主要的数据类型，三种原始类型的值——数值、字符串、布尔值——在一定条件下，也会自动转为对象，也就是原始类型的“包装对象”。

## 原始类型与包装对象的自动转换

> abc是一个字符串，本身不是对象，不能调用length属性。JavaScript 引擎自动将其转为包装对象，在这个对象上调用length属性。调用结束后，这个临时对象就会被销毁。这就叫`原始类型与实例对象的自动转换`。  
> 自动转换生成的包装对象是只读的，无法修改。所以，字符串无法添加新属性。也就是说你不能给一个字符串添加属性。

```js
var str = 'abc';
str.length // 3

// 等同于
var strObj = new String(str)
// String {
//   0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"
// }
strObj.length // 3
```

## 自定义方法
> 只能在包装对象的原型上添加

```js
String.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

'abc'.double()
// abcabc

Number.prototype.double = function () {
  return this.valueOf() + this.valueOf();
};

(123).double()
// 246
```

