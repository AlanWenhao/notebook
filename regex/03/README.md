# 正则括号的作用

## 括号的作用
提供分组

## 目录
- 分组和分支结构
- 分组引用
- 反向引用
- 非捕获括号

## 分组和分支结构
括号最直观的作用，表示括号内的正则是一个整体，即子表达式

### 分组
> 我们知道 /a+/ 匹配连续出现的 "a"，而要匹配连续出现的 "ab" 时，需要使用 /(ab)+/。  

### 分支结构
> 而在多选分支结构 (p1|p2) 中，此处括号的作用也是不言而喻的，提供了分支表达式的所有可能  

```js
匹配
I love JavaScript
I love Regular Expression

var regex = /^I love (JavaScript|Regular Expression)$/;
```

### 分组引用
> 这是一个强大的功能，有了它，我们就可以进行数据提取，以及更强大的替换操作  

比如日期的格式 YYYY-MM-DD
一般正则的匹配是 `/\d{4}-\d{2}-\d{2}/`
而加上括号之后是 `/(\d{4})-(\d{2})-(\d{2})/`

观察二者可视化图像，可以看到，加了括号的，与前者相比，后者多了分组编号，如`Group #1`
**其实正则引擎也是这么做的，在匹配过程中，给每一个分组都开辟一个空间，用来存储每一个分组匹配到的数据**

#### 获取

```js
// 获得分组之后，我们就可以通过JS提取他们，提取年月日
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var str = '2017-10-08';
console.log(str.match(regex));
// ["2017-06-12", "2017", "06", "12", index: 0,input:"2017-06-12"]
```

还可以使用正则实例的 `exec` 方法来获取
```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var str = '2017-10-08';
var result = regex.exec(str);
console.log(result);
// ["2017-06-12", "2017", "06", "12", index: 0,input:"2017-06-12"]
```

或者使用构造函数的全局属性 $1 至 $9 来获取:
```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var str = '2017-10-08';

regex.test(string);
// 正则操作即可，例如
// regex.exec(string);
// string.match(regex);

console.log(Regexp.$1);
console.log(Regexp.$2);
console.log(Regexp.$3);
```


#### 替换，结合 `replace`
比如，想把 yyyy-mm-dd 格式，替换成 mm/dd/yyyy 怎么做?
```js
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, "$2/$3/$1");
console.log(result);
// => "06/12/2017"

------------------------- 等价于 ----------------------------
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function () {
    return RegExp.$2 + "/" + RegExp.$3 + "/" + RegExp.$1;
});
console.log(result);
// => "06/12/2017"

------------------------- 等价于 ----------------------------
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function (match, year, month, day) {
    return month + "/" + day + "/" + year;
});
console.log(result);
// => "06/12/2017"
```

## 反向引用
有这样一个例子，匹配如下三种格式  
2016-06-12  
2016/06/12  
2016.06.12  

一般写出的正则是 `/\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/`
但是这样的正则会匹配 "2016-06/12" 这样的字符串

> 使用反向引用 \1 解决
```js
// 这里的 \1 代表的是第一组匹配的分组，同理，可以理解 \2 与 \3 的作用
var str = '2018-08-09';
var reg= /\d{4}(-|\/|\.)\d{2}\1\d{2}$/;
reg.test(str);
```

### 反向引用，括号嵌套

> 匹配原则，从外向内，从左向右

```js
var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
var string = "1231231233";
console.log( regex.test(string) ); // true
console.log( RegExp.$1 ); // 123
console.log( RegExp.$2 ); // 1
console.log( RegExp.$3 ); // 23
console.log( RegExp.$4 ); // 3
```

### \10 表示什么
> \10  表示第十个分组还是 \1 和 0 呢？  
表示第十个分组
```js
如果真要匹配 \1 和 0 的话，请使用 (?:\1)0 或者 \1(?:0)
```

### 引用不存在会怎么样

> 应用不存在，\1 则代表对 '1' 进行转义，匹配 '1'

### 分组后面有量词

> 分组后面有量词的话，分组最终捕获到的数据是最后一次的匹配

```js
var regex = /(\d)+/;
var string = "12345";
console.log( string.match(regex) );
// => ["12345", "5", index: 0, input: "12345"]
// 分组(\d)匹配到的是是最后一次匹配的结果 5

var regex = /(\d)+ \1/;
console.log( regex.test("12345 1") );
// => false
console.log( regex.test("12345 5") );
// => true
```

## 非捕获括号
> 之前出现的括号，都会捕获他们匹配到的数据，以便后续的引用，因此称他们为捕获分组或者捕获分支。

> 如果只是向应用括号原本的分组功能而不使用引用功能，即不再JS的 api 里面引用也不再正则中引用，可以使用非捕获括号 (?:p)  (?:p1|p2|p3)  

```js
var regex = /(?:ab)+/g;
var string = "ababa abbb ababab";
console.log( string.match(regex) );
// => ["abab", "ab", "ababab"]
```

## 相关案例
- 字符串 trim 方法模拟
- 将每个单词的首字母转化成大写
- 驼峰化
