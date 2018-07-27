const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
    console.log(ctx.req.url); // 原生req的请求路径
    console.log(ctx.req);
    console.log(ctx.request.req.url);
    console.log(ctx.request);
    await next();
});

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);