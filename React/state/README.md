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

## 如果要依赖于前一个状态去计算后一个状态，同步情况

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

## react 中的setState是同步的还是异步的？
> 回答：大多数场景下是异步的，因为不能立即拿到结果

```js
class App extends React.Component {
  state = { val: 0 }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)

    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val)

    setTimeout(_ => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val);

      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val)
    }, 0)
  }

  render() {
    return <div>{this.state.val}</div>
  }
}

// 结果就为 0, 0, 2, 3
```

```
总结：
1、setState 只是在“合成事件”和钩子函数中是“异步”的，在原生时间和 setTimeout 中都是同步的。
2、setState 的“异步”并不是说内部是有异步代码实现的，其实内部的执行时同步的，只是合成事件和钩子函数的调用在更新之前，导致合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的异步，当然可以通过第二个参数 callback 拿到跟新后的结果
3、setState 的【批量跟新优化】也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout中不会批量更新。
```

## 1、合成事件中的`setState`
> 合成事件，react 为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，比如 jsx 中常见的 onClick、onChange 这些都是合成事件

```javascript jsx
class App extends Component {

  state = { val: 0 }

  increment = () => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 输出的是更新前的val --> 0
  }

  render() {
    return (
      <div onClick={this.increment}>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## 2、声明周期函数中的setState
> 整个生命周期就是一个【事务操作】，所以标识位isBatchingUpdates = true,所以流程到了enqueueUpdate()时,实例对象都会加入到dirtyComponents 数组中

```javascript jsx
class App extends Component {

  state = { val: 0 }

 componentDidMount() {
    this.setState({ val: this.state.val + 1 })
   console.log(this.state.val) // 输出的还是更新前的值 --> 0
 }
  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## 3、原生事件中的setState
> 原生事件是指非react合成事件，原生自带的事件监听 addEventListener
> 原生事件不会通过合成事件的处理方式，自然也不会进入更新事务的处理流程。setTimeout 也一样，在setTimeout回调执行完成了原更新组件的流程，不会放入dirtyComponent进行异步更新，其结果自然也是同步的

```javascript jsx
class App extends Component {

  state = { val: 0 }

  changeValue = () => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 输出的是更新后的值 --> 1
  }

 componentDidMount() {
    document.body.addEventListener('click', this.changeValue, false)
 }
 
  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## 4、setTimeout中的setState
> 基于event loop 的模型下，setTimeout中 setState 总能拿到最新的state值
```javascript jsx
class App extends Component {

  state = { val: 0 }

 componentDidMount() {
    setTimeout(_ => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 输出更新后的值 --> 1
    }, 0)
 }

  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## 批量更新
> 在 setState 的时候，react 内部会创建一个 updateQueue，通过 firstUpdate、lastUpdata、lastUpdate.next 去维护一个更新的队列，在最终的performWord中，相同的key会被覆盖，只会对最后一次的setState进行更新

```javascript jsx
class App extends Component {

  state = { val: 0 }

  batchUpdates = () => {
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
 }

  render() {
    return (
      <div onClick={this.batchUpdates}>
        {`Counter is ${this.state.val}`} // 1
      </div>
    )
  }
}
```
