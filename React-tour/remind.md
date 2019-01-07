# remind

> 在这里做一些学习的备忘

## basic
- DRY原则
    - 能够计算的到的状态就不要单独存储
    - 组件尽量无状态，所需数据通过props获取
- JSX其实是语法糖（React.createElement），而不是模板语言
    - 对比 React.createElement 与 document.createElement 其实都是创建节点的方法
- 自定义组件以大写字母开头，因为jsx可以直接使用属性语法，那么 `<menu.item>` 也是可以直接书写组件，不用大写

## 其他
- 组件中 `this.rootNode`

## 生命周期
- 基本概念
    - 横向：创建，更新，卸载
    - 纵向：Render，Pre-commit，commit
    - 参见 `pdf`
    - 16.3新引入的方法：`getDeviceStateFromProps`、`getSnapshotBeforeUpdate`
    - `componentDidupdate` 什么时候使用，比如页面的文章是根据ID来动态显示，那么这时候就可以在获取到ID之后，在这个生命周期进行特定文章的获取
- constructor
    - 用于初始化内部状态，很少使用
    - 唯一可以直接修改state的地方
- getDeviceStateFromProps 如何从属性初始化内部状态
    - 当state需要从props初始化时使用
    - 尽量不要使用：维护两者状态一致性会增加复杂度。也就是上面提到的DRY原则
    - 每次render都会调用，是用来替代原来`componentWillRecieveProps`
    - 典型场景：表单控件获取默认值。表单控件具有默认值，担当用户操作的时候，其状态将会被输入时的状态替换
- componentDidMount
    - UI渲染完成之后执行
    - 只执行一次
    - 典型场景：调用 api 
- componentWillUnmount
    - 组件移除时被调用
    - 典型场景：资源释放
- getSnapshotBeforeUpdate
    - 页面render之前调用，state已更新
    - 典型场景：获取render之前的DOM状态
- componentDidUpdate
    - 每次UI更新时被调用
    - 典型场景：页面需要根据props变化重新获取数据，比如，上面提到的根据id获取新文章
- shouldComponentUpdate
    - 决定 Virtual DOM 是否要重绘
    - 不是很常用，一般可以由 PureComponent 自动实现
    - 典型场景：性能优化

## 虚拟DOM
> 进行两个树状结构diff的算法复杂度是 O(n^3)，在Facebook工程师的努力下，Virtual DOM 的 diff 算法复杂度直接变成线性复杂度，O(n) 🐮🍺  
> - 算法复杂度为O(n)
> - 虚拟 DOM 如何极端diff
> - key 属性的作用

虚拟 DOM 是如何工作的
- 广度优先，分层比较
    - 根节点开始比较
    - 节点顺序发生变化
    - 节点类型发生变化（直接替换）
    - 节点跨层移动（直接移除，并创建新的节点）
- 虚拟 DOM diff 算法的实现基于两个假设
    - 组件的 DOM 结构是相对稳定的（所以节点的跨层移动，算法并没有做深层次的比较，而是直接替换与新建）
    - 类型相同的兄弟节点可以被唯一标识（需要 key 做唯一标识）

## 高阶组件（HOC）
> 对已有组件的封装，形成一个新的组件，新的组件具有自己的应用逻辑，这些应用逻辑会产生新的状态，这些状态会传给已有的组件。所以说高阶组件不会有自己的UI展现，而是仅仅为他的已有组件提供额外的功能以及数据  
