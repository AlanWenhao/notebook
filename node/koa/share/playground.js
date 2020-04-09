
const Koa = require('koa');
const app = new Koa();

// app.use((ctx, next) => {
//   console.log(1);
//   next();
//   console.log(2);
// })
// app.use((ctx, next) => {
//   console.log(3);
//   next();
//   console.log(4);
// })
// app.use((ctx, next) => {
//   console.log(5);
//   next();
//   console.log(6);
// })

app.use(async ctx => {
  if (ctx.path === '/favicon.ico') return;
  console.log('ctx.url', ctx.url);
  console.log('ctx.req.url', ctx.req.url);
  console.log('ctx.request.url', ctx.request.url);
  console.log('ctx.request.req.url', ctx.request.req.url);

  console.log('ctx.req === ctx.request.req', ctx.req === ctx.request.req);


  ctx.body = 'Hello world';
});

app.listen(3000);
