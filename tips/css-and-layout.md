### 模拟改变input outline 颜色
```css
input[type=text], textarea {
  transition: all 0.30s ease-in-out;
  outline: none;
  padding: 3px 0px 3px 3px;
  margin: 5px 1px 3px 0px;
  border: 1px solid #DDDDDD;
  color: rgb(247,60,60);
}
input[type=text]:focus, textarea:focus {
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  padding: 3px 0px 3px 3px;
  margin: 5px 1px 3px 0px;
  border: 1px solid rgba(247, 60, 60, 1);
}
```

### 使用 :not() 在菜单上应用/取消边框
```
.nav li:not(:last-child) {
	border-right: 1px solid black;
}
```

### `will-change` 的作用
> 告知浏览器现在将要做什么，浏览器可以在发生变化前提前做好相应的优化工作
- 不要将其运用在太多的元素上：因为浏览器本身就已经有优化工作了，这样反而会消耗更多的资源
- 有节制地使用：当元素恢复到初始状态时，浏览器会丢掉之前的优化工作，如果声明 `will-change`，浏览器 会将优化保存的更久
- 不要过早使用 `will-cahnge` 优化：其设计初衷是作为最后的优化手段，不应该用来预防性能问题。
- 给他足够的工作时间

### object-fit
- 可以设置cover等属性来拉伸或者平铺，就像background-size

### flex 和 min-width
> 要实现一个左边固定，右边自适应，并且右边里面有文字，文字需要超出显示省略号  
> 这时候传统的左边定宽，右边自适应不能使文字超出隐藏
解决方案：  
- 父容器设置display: flex;
- 左边容器设置定宽
- 右边容器设置flex: 1; min-width:0;
- 右边容器中的文字设置超出显示省略号
- 原因：如果不设置min-width,右边的flex: 1;的元素会把左边的挤小（可以尝试调大min-width看看效果）


### 各种居中的解决方案，首先你要有一个decision tree like：
[参考链接 css-tricks](https://css-tricks.com/centering-in-the-unknown/)
- 水平
  - 是否是inline或者inline-*元素
  - 是否是block元素
  - 是否有不同块状元素同时需要居中
- 垂直
  - 是否是inline或者inline-*元素
    - 是否是一行
    - 是否是多行
  - 是否是block元素
    - 元素高度已知
    - 元素高度未知
    - 是否决定使用flexbox
- both 水平 and 垂直
  - 元素宽高固定
  - 元素宽高未知
  - 是否决定用flex
  - 是否决定用grid
