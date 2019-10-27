# call&apply

## call
> - 可以改变this指向
> - 让当前函数执行

```js
function fn1() {
    console.log(this, arguments);
}

fn1.call();    // 浏览器中打印 window
fn1.call('str');    // 打印 String 'str'
```
