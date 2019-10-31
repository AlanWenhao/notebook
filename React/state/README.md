# React state

## 基本前置知识
- react 操作数据的唯一方式，setState
- this.replaceState 方法在新版本被取消
- setState 会使页面render，使页面render的另一个方法是 `this.forceUpdate()`

> setState(updater, [callback])  
```js
updater: 更新数据 FUNCTION/OBJECT
callback: 更新成功后的回调 FUNCTION
```



> 当调用 `setState` 的时候，其实状态并没有直接改变，而是放入一个队列当中去

## state 的更新异步的情况
```js
this.state.num = 0;
this.setState({ num: this.state.num += 1 });
console.log(this.state.num); // 0
this.setState({ num: this.state.num += 1 });
console.log(this.state.num); // 0
render() {
  // 2
  return (
    <div>{this.state.num}</div>
  )
}
```

## 如果要依赖于前一个状态去计算后一个状态

> 下面的代码 `setState` 接收一个回调函数，参数传入 prevState ，当第二次调用 setState 的时候，接收的 prevState 就是前面 +1 后的状态

```js
this.setState((state) => { num: state.num + 1 });
this.setState((state) => { num: state.num + 1 });
```

## 模拟 setState 的队列 `setState.js`

## setState 接收第二个参数

同上面的例子，为setState添加第二个参数，这里提现的是setState会将队列中的state操作全部执行完，才会执行其他操作
```js
this.setState((state) => { num: state.num + 1 }, () => { console.log(this.state) });
this.setState((state) => { num: state.num + 1 }, () => { console.log(this.state) });

// 两次打印的结果都是 2 ，并不是 1 与 2，因为 setState 内部会将中途的操作合并放到最后来执行
// 可以查看模拟的 setState.js
```
