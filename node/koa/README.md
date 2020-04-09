# koa 源码分析思路

## 基本
- koa 是一个类，核心代码在`lib`下的application
- 原生的使用的是 req 与 res，koa 自己封装了 request 与 response，并且封装了 ctx做了一个代理，代理了原生的与自己封装的request与response
- 可以直接使用`ctx.heander`来获取请求头，或者使用其来设置头，自己封装的 request的属性与方法都能够通过ctx直接访问
- 可以直接使用 `ctx.get` 或 `request.get(field)` 来直接获取请求头的信息，其他功能参考官网
- 在koa中`ctx.request.url`与`ctx.request.req.url` 是相同的


- 源码思路
  - Koa是一个类
  - Application类下其实只有两个方法，`use` 跟 `listen`
  - 在引入`context`之后，使用`this.context = Object.create(context)`，这样不会破坏原有的对象，request 与 response 相同
  - context 唯一的职责就是做代理
    - 使用 `__defineGetter__` 方法设置属性访问代理器，注意代理方法其中 this 至的是谁
    - 使用 defineGetter 方法实现 `definedGetter(property, key)` 来重复执行上一步的操作
  - 定义`createContext(req, res)`方法创建 `ctx`
    - 给 context 上赋予 req、res、request、response 方法
    - `context.req = context.request.req = req`
    - 要把req放到request上，以便定义自己的方法的时候，可以拿到各种参数
  - request.js 与 response.js 的作用是扩展 request 与 response 这个对象
    - 定义 request 方法的时候，可以在set中使用 `this.req`，指的就是原生的req，这里的this是调用方，也就是ctx，ctx上有req，代表原生的req
    - 给request定义url方法，很简单
    - 个response定义body方法 
      - 设置set用来设置，保证调用`ctx.body = 'xxx'`的时候，能够等价于`ctx.response.body = 'xxx'`,所以在context中使用`__defineSetter__`来代理设置
  
  
```js
app.use((ctx) => {
  console.log(1);
  next();
  console.log(2);
})
app.use((ctx) => {
  console.log(3);
  next();
  console.log(4);
})
app.use((ctx) => {
  console.log(5);
  next();
  console.log(6);
})

// 洋葱模型的执行方式，1、3、5、6、4、2
// 其实就是将三个use函数变成了一个大函数
app.use((ctx) => {
  console.log(1)
  (ctx) => {
    console.log(3);
    (ctx) => {
      console.log(5);
      () => {}
      console.log(6);
    }
    console.log(4);
  }
  console.log(2)
});
```
- next 方法，也就是洋葱模型的核心，难点在于中间件（use方法）可以决定是否往下走（调用next方法），并支持async、await
  - 注意，遇到要写 next 的地方，前面一定写上 await 或者 return
  - 核心原理：`Koa` 内部有 `middlewares` 数组里面放着每项 `use` 方法传递进来的函数
  - 在`handleRequest`的时候，创建完上下文之后，使用 `compose` 方法将 `middlewares` 中的函数包装成一个大的洋葱函数，执行完
  - 最后，res.end(ctx.body)

```js
// compose 函数的核心逻辑
compose(ctx) {
  // [fn, fn, fn]
  const dispatch = (index) => {
    if (index === this.middlewares.length) return Promise.resolve();
    const middle = this.middlewares[index]
    return Promise.resolve(middle(ctx, () => dispatch(index + 1)));
  }
  return dispatch(0); 
}
```

## 思考，如果在书写koa时候，连续调用next方法，会导致跳过中间的步骤，koa-compose 源码中式怎么解决的

> 在 `dispatch` 函数外部设置了一个 `index` ,每次 dispatch 都将 `index` 置为传入的 `i` , 如果频繁执行 `dispatch`,因为其返回的是 promise，一旦重复调用 dispatch，外部的 `index` 就会变大，在上一个 `dispatch` 执行的时候，就会比较，这次传入的 `i` 是否 `<=`  `index` ，如果是，那就是有 `next` 提前执行了

## koa 的错误处理
- 上面有一步是在compose函数执行完后， `then` 调用 `res.end(ctx.body)` ，因为 `compose` 执行完了之后 `return` 的是一个 `promise` , 所以这里支持捕获错误，这里可以 `.catch(err => { this.emit('error', err) })`
- 使用 `app.on('error', (err) => {})` 就能捕获到全局错误
- 注意，前提是 Koa 继承自 EventEmitter

## compose 执行完了之后，需要res.end(ctx.body)，这里注意，要对ctx.body做判断然后在 end
