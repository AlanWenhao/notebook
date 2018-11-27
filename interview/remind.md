## 工作中遇到比较棘手的问题

### 样式
- 移动端页面在 安卓 与 ios 上兼容性问题
```
1、列举一些常见的兼容问题，比如 ios 的平滑滚动等
2、如何调试，使用一些代理工具，比如 nginx 代理本地资源，在移动设备上调试。或者其他代理工具，charles等
```

- 兼容低版本浏览器
```
1、使用autoprefixer，配置浏览器版本覆盖范围，配置特定兼容规则，比如IE的透明度等等，具体见 autoprefix
2、怎么调试，因为手头没有低版本IE的机器，使用 browser stack （我之前公司有用过，付费的）
```

### 架构
```
可以说说自己给旧公司的架构小小升级了一下，从webpack2升级到了3（4）。然后开始鬼扯。。。我会webpack哦~
还可以说自己（自己跟组员）把项目公用的 组件 提取出来，放在了cdn上，避免了什么东西都去 npm install 一个插件，然后说说这么做的好处。
还可以说自己为了统一代码风格，加了eslint，项目代码风格统一了，以后我看你的代码就跟看自己的一样，美滋滋
```

### 业务
- 移动端数据管理
```
1、由于后台api需要兼容多个端，移动、PC，一个接口发送的数据，在移动端被切割成了两个甚至三个页面，这时候需要移动端跳转页面的时候，判断页面去向，决定是否将本页填写的数据保存在 vuex（redux），最后一个页面，点击“确定”，提取存储的数据，发送给后端。
这里比较麻烦的是，判定用户是从第一步到第三步正常走下去，还是到了中途就返回，根据这些用户行为，在前端配合路由将一个接口需要发送的数据管理好
```

- 移动端请求数据量大，请求时间长，渲染成本高，结合 vuex（redux）缓存数据的想法
```
假如一个页面请求数据，数据量挺大，一般的做法，重新进入这个页面，每次都会请求，可以使用vuex（redux）记录一个是否请求过的 flag ，再次进入避免了重复的请求。
但是这里要根据具体业务调整，有时候不请求新数据反而会造成该展示的数据没展示
```

### 工作习惯
- 更改项目老代码的棘手
```
可以说说自己怎么在上家公司改了组内成员的老代码，并且自己会在空余时间补充文档，不让后人受罪。
还可以说自己很在意命名规范的，css的，变量的。。。也会在项目文档说明
```