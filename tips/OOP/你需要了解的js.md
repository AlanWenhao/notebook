# 你需要了解的JS

## 引入
```js
var a = 1;
fucntion xx(){
    alert(a);
    var a = 5;
}
xx();
```
## JS 的解析与执行过程
- 全局
    - 预处理阶段
    - 执行阶段
- 函数 (因为 ES6 之前JS只有函数作用域)
    - 预处理阶段
    - 执行阶段

### 全局的时候
扫描用var创建的变量，以及 声明方式创建的函数，创建一个此法环境(LexicalEnvironment)，并将其添加至其中。变量赋值为undedined，函数建立引用。
> 函数创建有两种方式:声明的方式、函数表达式  
> function test() {}  
> var test = function() {}  
> 预处理阶段，函数表达式创建的test被赋值为undefined  

1、以下做一个简单的比喻：
```js
LexicalEnvironment
{
    a: undefined
    test: 对函数的引用
}
```
2、看一个关于函数的简单的例子：
```js
console.log(f);
console.log(g);
f();
g();

function f() {
    console.log('fff');
}
var g = function() {
    console.log('ggg');
}

结果：
    原样打印函数 f
    undefined
    ff
    报错：'g is not a function'
解释：预处理阶段，函数f被添加到了此法环境中，并成功创建函数的引用，但是 g 是undefind
```
3、看一个关于变量的简单例子：
```js
console.log(a); // undefined
console.log(b); // 报错 'b is not defined'
var a = 1;
b = 2;

这里很好理解，不做解释，但是注意，在函数作用于内不用var声明的变量会“变量提升”
```
4、混起来再来一个
```js
console.log('前：', a);
var a = 1;
function a() {
    console.log('aaa');
}
console.log('后：', a);
a();

结果：
   打印出函数a
    1
解释：
    可以这么理解：此法环境中一个对于a的赋值是undefined，一个是函数的引用，引用优先

-------------------------------------------------------
var a = 1;
function a() {
    console.log('aaa');
}
a(); // 报错，'a is not a function'

-------------------------------------------------------
var a = 1;
var a = function() {
    console.log('aaa');
}
a();

结果：aaa
解释：因为这里都是var，执行阶段发生了覆盖，如果颠倒顺序，自然会报错
```
5、最后，结合上面的现象，思考
```js
a(); // aaa
var a = 1;
function a() {
    console.log('aaa');
}
var a = function() {
    console.log('AAA');
}
a(); // AAA
```
总结
> 处理函数声明有冲突，会覆盖(意为在定义函数f之前已经定义了变量f，函数会将其覆盖)  
> 处理变量声明有冲突，会忽略  
> 一句话理解：函数是一等公民  


### 函数中时
- 函数每调用一次，都会创建一个属于自己的全新此法环境
- 此法环境中预先添加了函数的参数
- 内部声明式函数
- 内部var变量
- 冲突情况处理与全局一样

1、一个简单的例子，考察函数内部预处理
```js
function test(a, b) {
    alert(a);
    alert(b);

    var a = 100;
    alert(a);
    function b() {
        console.log('this is function b');
    }
}
test(1, 2);
结果：依次是：1 和 function b(){...} 和 100
注意：并不是undefined，function b() {} 和 100
解释：上面第五条，冲突情况处理与全局一样：变量跳过，函数覆盖
```

2、执行阶段注意，没有通过 var 声明的变量会变成 window 下的变量

## JS作用域

1、首先从一段代码入手
```js
alert(a);
alert(b);
alert(c);
alert(d);

var a = 1;
if(false) {
    var b = 2;
} else {
    c = 3;
}
function() {
    var d = 4;
}

结果：undefined, undefined, 报错， 报错
```
2、作用域的定义：
> 确定一个变量或成员可以被访问的范围  

3、块级作用域
> 通常的语言中将 {} 以内的代码规定为一个块  
> js中，es6 之前没有块级作用域概念

4、函数作用域
> 已函数快为界限的作用域，严格的函数作用域子函数不能访问父函数中声明的变量，但是大部分语言都不这么实现  

5、动态作用域，看一段代码理解：
```js
function f(){
    alert(x);
}

function f1() {
    var x = 1;
    f();
}

function f2() {
    var x = 6;
    f();
}

f1();
f2();

结果：报错 x is not defined，说明了 js 中没有动态作用域
解释：JS 是静态作用域（至于什么是静态作用域，向后看。。。）
```
6、静态作用域，又称词法作用域或闭包
当函数被声明的时候，也就是JS的预处理阶段，JS会检测函数当前声明的位置，也就是函数创建时候的词法环境，当函数内部的代码执行时，在函数内部又创建了一个属于自己内部的词法环境，执行中的代码在寻找变量时，优先寻找当前词法环境，如果没有，则会寻找当前函数 <u>*被创建时*</u> 所在的词法环境，层层向上，直到window

更改上面的代码：(考察JS作用域以及闭包知识)
```js
var x = 200;
function f(){
    alert(x);
}

function f1() {
    var x = 1;
    f();
}

f1();

结果：200
注意：不是 1
解释：执行时候的此法环境找不到声明过的 x 之后，会向 f 被创建时候的 此法环境中寻找 x ，也就是window，因为函数 f 被创建时候所在的此法环境不是 f1 而是 window
```
> 由此可以知道，至关重要的一步是函数在哪里声明的，<u>函数声明的时候就确定了自己的作用域！！！</u>  

6-1、那我们经常听到的 *作用域链* 又是怎么回事呢？就是在上面解释的层层向上找，子函数自己的作用域包括其被创建时候的此法环境,当前作用域找不到运行时需要的变量，便会找向子函数被创建时所在函数的作用域，直到找到一个函数是在window下被创建的，取到window下的变量。这样一来也解释了 <u>为什么window下定义的变量能够被所有的函数访问</u>。

6-2、不同方式创建的函数会有区别吗？看代码：
```js
function f() {
    var x = 100;
    var g = function () {
        alert(x);
    }
    g();
}
f();

结果：100
解释：可见，函数表达式形式创建的函数其作用域与声明式是一样的
-------------------------------------------------------------

function f() {
    var x = 100;
    var g = new Function("", "alert(x)");
    g(x);
}
f();

结果：报错：x is not defined
解释：使用 new 关键字创建的函数，其作用域是window
```
