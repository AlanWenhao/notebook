KOA 源码设计思路

## 核心思想
> - `req`，`res` 的代理机制
> - 中间件`middleware` 的洋葱模型

## 最简单的 node 服务

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
 
server.listen(3000);
```

上面的代码很简单，http 的 createServer 方法创建了一个 http.Server 的实例，http.Sever 继承于 EventEmitter 类。我们传入的函数，其实是添加到了 server 的 request 事件中，相当于一种快捷方式。所以你也完全可以不传入任何参数，然后手动去监听 request 事件。代码的最后将 server 绑定到 3000 端口，开始监听所有来自 3000 端口的请求。

原生的请求中有两个参数，`req` 与 `res`，一个可读流，一个可写流，就是说我们通过 `req` 获得该 `http` 请求的信息，然后将数据写入 `res` 做出响应。
