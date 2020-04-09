
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  if (ctx.path === '/favicon.ico') return;

  console.log('ctx.url', ctx.url);
  console.log('ctx.req.url', ctx.req.url);
  console.log('ctx.request.url', ctx.request.url);
  console.log('ctx.request.req.url', ctx.request.req.url);

  ctx.body = 'Hello world';
});

app.listen(3000);
