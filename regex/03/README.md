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
