# render props 和高阶组件

> 比如现在有个组件，功能是监控鼠标的位置  
> 另外的组件想要使用这个组件的功能，而对鼠标位置的值进行不同的渲染

> 高级组件本质上与 render props 没有区别


## render props 写法

```javascript jsx
import react from 'react';
class MouseTracker extends React.Component({
  state = {
    x: 0,
    y: 0
  }
  moveMouse = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div onMouseMove={this.moveMouse}>
        {this.props.render(this.state)}
      </div>
    )
  }
})


class Child extends React.Component({
  render() {
    return (
      <div>
        鼠标当前的位置是：{this.props.x}，{this.props.y}
      </div>
    )
  }
});

// 在父级页面 

ReactDom.render(
  <>
    <MouseTracker>
      {
        (xxx) => <Child {...xxx}></Child>
      }
    </MouseTracker>
  </>
, window.app)

// 或者
ReactDom.render(
  <>
    <MouseTracker render={(xxx) => <Child {...xxx}></Child>}></MouseTracker>
  </>
, window.app)

```

## HOC写法
```javascript jsx
import react from 'react';
class MouseTracker extends React.Component({
  state = {
    x: 0,
    y: 0
  }
  moveMouse = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div onMouseMove={this.moveMouse}>
        {this.props.render(this.state)}
      </div>
    )
  }
})

function withMouseTracker(Comp) {
  return props => <MouseTracker render={ data => <Comp {...props} {...data} /> } />
}
class Child extends React.Component({
  render() {
    return (
      <div>
        鼠标当前的位置是：{this.props.x}，{this.props.y}
      </div>
    )
  }
})
export default withMouseTracker(Child);

// 在父级页面 

ReactDom.render(
  <>
    <Child />
  </>
, window.app)
```
