
const Koa = require('../my-koa/application');
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
  console.log(ctx.url);
  ctx.body = 'Hello world';
});

app.listen(3000);
