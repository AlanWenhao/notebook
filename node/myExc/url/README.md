# url模块

## 基础概念
统一的资源定位符，表示资源的地点，URL是使用浏览器访问web页面时需要输入的网页地址

### URL格式
> http://user:pass@host.com:8080/p/a/t/h?query=string#hash

```bash
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### url对象
```js
Url {
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'cart.jd.com',
    port: null,
    hostname: 'cart.jd.com',
    hash: null,
    search: '?r=0.3662704717949117',
    query: 'r=0.3662704717949117',
    pathname: '/cart.action',
    path: '/cart.action?r=0.3662704717949117',
    href: 'https://cart.jd.com/cart.action?r=0.3662704717949117'
}
```

如上属性的含义：
| 属性 | 含义 |
| :-: | --- |
| protocol | 表示URL的小写的协议，例如'http:' |
| slashes(不常用) | 如果协议protocol冒号后跟的是两个斜杠字符（/）,那么值为true |
| auth(不常用) | auth属性时URL的用户名与密码部分。对应上面的例子就是 user:pass |
| host | host属性时URL完整小写的主机部分。包括port |
| port | 如果没有则为 null |
| path | 由pathname与search组成的串接,不包含hash字符后面的东西，例如/p/a/t/h?query=string |
| *hostname* | hostname是host属性排除端口port之后的小写的主机名部分 |
| *pathname* | pathname 属性包含URL的整个路径部分。跟在host后面，截止问号 ？或者哈希字符 # 分隔 |
| *search* | search属性包含URL的查询字符串部分，包括开头的问号字符 ？, 例如?query=string |
| *query* | query属性是不包含问号 ？的查询字符串,例如query=string |
| *hash* | hash属性包含URL的碎屏部分，包括开头的哈希字符 # |

！！！技巧：
```
host = hostname + port
path = pathname + search
search = ? + query
```

## url模块常用方法`parse()`、`format()`、`resolve()`

### url.parse(urlString)

- 解析一个url字符串并返回一个URL对象
- 如果urlString不是字符串则跑出TypeError

```js
const url = require("url");
const result = url.parse("https://cart.jd.com/cart.action?r=0.3662704717949117");
console.log(result); // 输出url对象
```

### url.format(urlObject)

将一个url对象格式化成url字符串
```js
const url = require("url");
var urlObj = {
    protocol:"https",
    slashes:true,
    hostname:"www.qihu.com",
    pathname:"/teach/content.html"
};
console.log(url.format(urlObj));

// 输出
// https://www.qihu.com/teach/content.html
```

### url.format(from, to)
主要用来插入或替换URL内容
- from 源地址
- to 需要添加或替换的标签
```js
const url = require("url");

console.log(url.resolve("/one/two/three","four"));
console.log(url.resolve("/one/two/","four"));
console.log(url.resolve("http://www.baidu.com","/topic"));
console.log(url.resolve("http://www.baidu.com/one","topic"));

// 输出
// /one/two/fore
// /one/two/fore
// http://www.baidu.com/topic
// http://www.baidu.com/topic
```
从上面4个例子可以看出，当源地址pathname路径后的最后一个"/"后面有内容时替换其内容，如果为空则添加到"/"后。
