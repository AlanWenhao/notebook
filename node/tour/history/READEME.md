# 前端路由简介

> - 参考文章
>   - [博客文章](http://blog.stakecode.com/2017/09/01/2017-09-01-Javascript-History-Hash/)
>   - [CSDN](https://blog.csdn.net/swgsunhj/article/details/77160893)

## 什么是前端路由
以往的web应用，比如传统的 MVC 架构站点，C 层是在后端的控制范围，也就是说决定当前路由下执行何种数据操作的把控在后端。随着前端框架的更新发展，框架的思想简历在前后端分离的大思想之上，从比较简单的角度谈，后端为web引用提供数据接口，前端则控制路由，页面跳转主动数据请求等。在如今的单页应用中，路由的跳转通过hash与history实现。

- hash，
- history，

### 调用history优点
- pushState()设置新的URL可以是与当前URL同源的任意URL，而hash只修改#后面的部分，因此只能设置与当前URL同文档
- pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；而 hash 设置的新值必须与原来不一样才会触发动作将记录添加到栈中；
- pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中；而 hash 只可添加短字符串；
- pushState() 可额外设置 title 属性供后续使用。

### 一些关键点
- HTML5引入了 history.pushState() 和 history.replaceState()方法，它们分别可以添加和修改历史记录条目。这些方法通常与window.onpopstate 配合使用。