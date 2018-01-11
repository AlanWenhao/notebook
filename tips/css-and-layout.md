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
