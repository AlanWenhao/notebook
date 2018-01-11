# 你需要了解的JS

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
- 函数 (因为 ES6 之前JS只有函数作用域)
    - 预处理阶段
    - 执行阶段

### 全局的时候
1. 第一步：扫描用var创建的变量，以及 声明方式创建的函数，创建一个此法环境(LexicalEnvironment)，并将其添加至其中。
> 函数创建有两种方式:声明的方式、函数表达式  
> function test() {}  
> var test = function() {}  

以下做一个简单的比喻：
```js
LexicalEnvironment
{
    a: undefined
    test: 对函数的引用
}
```
看一个关于函数的简单的例子：
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
    报错：'g is not a function'
解释：预处理阶段，函数f被添加到了此法环境中，并成功创建函数的引用，但是 g 是undefind
```
看一个关于变量的简单例子：
```js
console.log(a); // undefined
console.log(b); // 报错 'b is not defined'
var a = 1;
b = 2;

这里很好理解，不做解释，但是注意，在函数作用于内不用var声明的变量会“变量提升”
```
混起来再来一个
```js
console.log('前：', a);
var a = 1;
function a() {
    console.log('aaa');
}
console.log('后：', a);
a();

结果：
   打印出函数a
    1
解释：
    可以这么理解：此法环境中一个对于a的赋值是undefined，一个是函数的引用，引用优先

-------------------------------------------------------
var a = 1;
function a() {
    console.log('aaa');
}
a(); // 报错，'a is not a function'

-------------------------------------------------------
var a = 1;
var a = function() {
    console.log('aaa');
}
a();

结果：aaa
解释：因为这里都是var，执行阶段发生了覆盖，如果颠倒顺序，自然会报错
```
最后，结合上面的现象，思考
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
