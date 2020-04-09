
const Koa = require('koa');
const app = new Koa();

// fn1
app.use((ctx, next) => {
    if (ctx.path === '/favicon.ico') return;
    console.log(1);
    next();
    console.log(2);
})

// fn2
app.use((ctx, next) => {
    console.log(3);
    next();
    console.log(4);
})

// fn3
app.use((ctx, next) => {
    console.log(5);
    next();
    console.log(6);
})

app.use(async ctx => {
    ctx.type = 'text/html; charset=utf-8';
    ctx.body = '<h1>洋葱模型</h1>';
});

app.listen(3000);
