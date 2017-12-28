# html-css

## 目录
- css盒模型

## css盒模型
1. 基本概念：标准盒模型 + IE 模型
1. 两者的区别
1. CSS是如何设置这两种模型的
1. JS如何获取盒模型对应的宽和高
1. 实例题目，有一定难度（根据盒模型解释边距重叠）
1. BFC、IFC（边距重叠的解决方案）

### 基本概念与区别
content、padding、border、padding，宽高代表content  
IE模型，又叫怪异盒模型，宽高代表content + padding + border

### CSS如何设置
```stylesheet
// 标准，也是浏览器默认的模型
box-sizing: content-box;

// IE(怪异)
box-sizing: border-box;
```

### JS 如何获取盒模型对应的宽高
1. 此方法仅能获取到内联样式的宽高
```
dom.style.width/height
```

1. 此方法仅IE浏览器支持，获取到的宽高是元素渲染过后的宽高
```
dom.getCurrentStyle.width/height
```

1. 此方法支持现代浏览器，得到渲染过后的dom宽高
```javasctipt
window.getComputedStyle(dom).width/height
```

1. 此方法多用于获取元素现对于视口(viewport)的位置，一共有4个api，left/top/width/height
```
dom.getBoundingClientRect().width/height
```

### 根据盒模型解释边距重叠
1. 重叠会发生在三种种情况下
    - 父子元素，子元素有margin-top
    - 上下相邻的元素，取他们之间margin的最大值
    - 空元素拥有上下margin，取最大值
1. 第一种情况下，加 overflow: hidden;即可解决，也就是BFC的概念

### BFC，也叫块级格式化上下文
1. BFC 原理
    - 第一，在 BFC 这个元素的垂直方向会发生重叠
    - 第二，BFC 的区域不会与浮动元素的 box 重叠，也是解决浮动的方案
    - 第三，BFC 在页面中是一个独立的容器，外面的元素不会影响里面，反之，里面的元素不影响外面
    - 计算 BFC 高度的时候，浮动元素也会参与计算，就比如已经清楚浮动的盒子内部的浮动元素可以撑起父级
1. 如何创建 BFC 
    - float 值不为 none
    - position 值不为 static(默认) 和 reletive
    - display 设置为inline、inline-block、table、table-cell等
    - overflow 的值 不为 visible，记住 overflow: auto;也会创建
1. BFC 的使用场景
    - 消除上下重叠的 margin，通过给元素增加一个父元素，父元素创建一个 BFC