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