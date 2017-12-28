# DOM相关

## 目录
- DOM 事件级别
- DOM 事件模型(冒泡、捕获)
- DOM 事件流
- 描述 DOM 事件捕获的具体流程
- Event 对象的常见应用
- 自定义事件

### DOM 事件级别( DOM 标准定义的级别)
1. DOM0
```
element.onclick = function() {}
```

1. DOM2,(DOM1 标准也是有的，但是没有定义事件相关的东西)
```
element.addEventListner('click', function(){}, false)
```

1. DOM3(定义了更多的事件)
```
element.addEventListner('keyup', function(){}, false)
```

### DOM 事件模型(捕获、冒泡)

### DOM 事件流
1. 第一阶段：捕获
1. 第二阶段：目标阶段(找到了目标对象)
1. 第三阶段：冒泡

### 描述 DOM 事件捕获的具体流程
