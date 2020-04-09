# Koa 源码设计思路

## 核心思想
> - `ctx` 的封装与 `req`，`res` 的代理机制
> -  基于洋葱模型的中间件系统 `middleware`，`app.use()`

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

## 最简单的koa服务
```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.type = 'text/css; charset=utf-8';
  ctx.body = 'Hello World';
});

app.listen(3000);
```

## koa 源码设计整体思路

![koa结构](./img/structure.jpg)

- Koa是一个类，其上有属性 `middleware`、`context`、`request`、`response`
  - context 每个请求都会创建一个 context 上下文，常用简写 ctx 
  - context.request 上下文上具有 koa 封装的 request 方法，对原生的 req 做了一层封装
  - context.response 上下文上具有 koa 封装的 response 方法，对原生的 res 做了一层封装

- Koa的实例暴露了公用的方法 `use`、`listen`
  - `use` 使用中间件
  - `listen` 使用 `node` 原生 `http` 模块启动http服务

- 每次访问 koa 服务，koa 都会将开发者通过 use 注册的中间件一一执行，且在执行中能够拿到 ctx 上下文
  - 类似于原生 node 服务执行是，函数内部可以拿到原生的 req 与 res

## Koa雏形

```js
const http = require('http');
const context = {};
const request = {};
const response = {};

class Application {
  constructor() {
    this.context = context;
    this.request = request;
    this.response = response;
    this.callbackFn = null;
  }

  use(fn) {
    this.callbackFn = fn;
  }

  callback() {
    return (req, res) => this.callbackFn(req, res)
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
}

module.exports = Application;
```
## ctx 中的代理

### koa 自己的 request 与 response 代理 原生的 req 与 res
- `request` 是一个对象，`koa/request` 文件中使用属性访问器 `get` 与 `set` 实现代理

### ctx 代理 request 与 response


### ctx
[app-context](https://koa.bootcss.com/#app-context)