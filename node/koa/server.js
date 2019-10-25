const Koa = require("./koa/application");
const fs = require("fs");
const app = new Koa();
const logger = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("logger");
      resolve();
    }, 1000);
  });
};
app.use(async (ctx, next) => {
  console.log(1);
  await next();
});
app.use(async (ctx, next) => {
  // 上下文
  console.log(2);
  //   throw new Error('出错')
  await logger();
  return next();
});
app.use(async (ctx, next) => {
  // 上下文
  console.log(3);
  await next();
  //   ctx.body = fs.createReadStream('2.server.js');
});

app.on("error", function(err) {
  console.log(err);
});

// koa 里面有个compose 方法 会讲所有的方法组合成一个大的promise
app.listen(3000);

// node 有原生 req res (原生)
// request response (koa封装的自己) 增加了很多的方法
// ctx 代理了 req ,res ,request,response

// 尽量不要使用原生的方法

// 0) 写一个类koa框架 把逻辑处理的好写一些
// 1) compose方法 如何用async+await来重写
// 2) compose next方法如何 避免多次调用 README
// 3) ctx.body 没有赋值 如何处理