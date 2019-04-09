# cookie & session
> nodejs 中通过 req.headers.cookie 获取请求头的cookie，可以看到cookie是存放在 __请求头__ 中的

## 参数
- name 名称
- value 值
- domain 默认只针对某个域
- path 在那个路径下可以读取 cookie 一般不设置，默认是 / ，比如设置了 /aaa 就可以在 /aaa 与其子路径下可访问
- expires / max-age 绝对时间与相对时间 不设置过期时间，默认是当前回话
    - max-age=10  表示10s时候过期
    - expires=new Date(Date.new() + 1000).toUtcString() 表示10s 之后过期

## 注意
- 上面的配置常用的是 max-age 与 domain 与 http-only
- cookie 通过服务端设置，也可以通过客户端设置，但是不能存放敏感信息
- cookie 默认可以通过客户端获取，可以通过 http-only 设置仅允许服务端设置
    - 设置了 `http-only` 之后客户端不能通过 `ducoment.cookie` 的方式修改，但是仍然可以通过调试窗口修改

## 关于domain的应用
> 假如现在有 a.test.com 和 b.test.com 同时绑定了 127.0.0.1，问题：在 a 设置的 cookie 在 b 能够取到吗？

```
不能，原因是 cookie 只能在同域共享，上面的两个域名其实是跨域的，可以查看cookie的domain，会发现在 a 设置的 cookie 其 domain 是 a.test.com
```

```
但是可以通过设置domain来共享cookie
res.setHeader('Set-Cookie', ['name=aaa', 'sex=bbb'], 'domain=.test.com');
```

## 通过给 cookie 添加签名保证客户端通过浏览器调试窗口更改cookie是无效的
- 使用node 的 `crypto` 模块加密
    - 相同的内容加密后的hash值相同
    - 不能反解密，但是可以撞库破解
    - 可以多次加密，防止撞库破解

```
// eg：给12345加密
// const crypto = require('crypto');
// let str = crypto.createHash('md5').update('123456').digest('base64');
// str = crypto.createHash('md5').update(str).digest('base64');
// str = crypto.createHash('md5').update(str).digest('base64');
```

更安全的做法，加盐（secret）

```
const crypto = require('crypto');
const scret = 'Alan';
let str = crypto.createHmac('sha256', scret).update('123456').digest('base64');
console.log(str);
```

```
// 思路 将value作为加盐算法的盐值加密，重新设置value为 value+加密value, 取值时判断要去的值前半段加密后是否等于后半段
// 注意 base64 编码的结果含有 + 与 / 但是cookie存放的时候这些值不能存在，因此要做一层剔除
// 代码见cookie.js
// 代码中用 . 作为 value 与 valueSign 的分隔符也是因为 base64 编码的字符串是不包含 . 的
```
