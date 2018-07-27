# node中的TCP，net模块

## 创建 TCP 服务器
```js
const net = require('net');
const server = net.createServer();
server.listen(port, function() {
    console.log(`server is starting at ${port}`);
});
------------- 或者createServer直接接收callback ---------------
net.createServer(options,connectionListener);
```
> - option.allowHalfOpen默认为false,如果改为true，当TCP服务器接收到客户端发送一个FIN包时不会回发FIN包
> - connectionListener参数用于指定当客户端与服务器建立连接时所要调用的回调函数，回调中有一个参数socket,指的是TCP服务器监听的socket端口对象

## 服务器server
server是net.server的实例，可以使用net.createServer(options, callback)创建

### net.Server 继承自EventEmitter
server实例可以监听的事件
- 'close' 事件
- 'connection' 事件
- 'error' 事件
- 'listening' 事件

### adress()
```js
server.address();
// 返回 prot、address、family
```
> - port      端口号
> - address   TCP服务器监听的地址
> - family    协议的版本

### maxConnections、getConnections()
设置最大连接数量或监听当前链接的客户端数量

```js
server.getConnections((err,count) => {  // 获取用户连接数
    console.log('已经链接'+count+'个用户')
});
server.maxConnections = 2; // 设置最大连接数
```

### close()
`close()` 方法执行，所有新的客户端链接将不再被接受，已经连接的客户端可以继续通信，当所有客户端连接断开，服务端会触发 `close` 事件，可以被`server.on('close')`捕获到.当所有已连接客户端断开连接，node进程退出
例子见 `basic.js`

### unref()
此方法执行后，新的客户端可以继续建立新连接，但是，一旦所有的客户端全部退出，node进程退出，且不会触发 on 监听的 `close` 事件

### close与unref区别
在于两个方法执行之后，新的连接能否被设置

### ref()
与 unref 相反，在一个已经调用 unref 的 server 中调用 ref，如果 server 是仅存的 server，则程序不会退出（默认）。对一个已经调用 ref 的 server 再次调用 ref 将不会再有效果。

## socket对象
`net.Socket` 类是TCP或UNIX Socket的抽象（在Windows上使用命令管道，而UNIX使用域套接字），一个`net.Socket`也是一个 dunplex stream，能被读写，并且是一个 EventEmitter
socket对象是 `net.Socket类的实例`

### 创建一个socket对象
方法一：
```js
new net.Socket([options])
```

方法二：
```js
server.on('connection', function(socket) {});
```

