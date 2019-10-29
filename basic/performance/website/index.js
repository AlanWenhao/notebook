const Koa = require('koa');
const server = require('koa-static');
const path = require('path');

const app = new Koa();
app.use(server(path.join(__dirname, 'client')))
app.use(server(path.join(__dirname, 'node_modules')))

app.use(async (ctx) => {
  if (ctx.path === '/api/list') {
    ctx.body = { name: 'alan', age: 25 }
  } else {
    await next();
  }
})

app.listen(4000, function() {
  console.log('start');
});
