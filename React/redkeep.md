# React Router V4 概念用法介绍
## babel-plugin-import
这个插件是babel模块化组件的引入方式，兼容antd，antd-mobile等  

[参考文章(来自简书)](http://www.jianshu.com/p/e3adc9b5f75c)

## react-router-dom
React 路由的解决方案，`BrowserRouter` 与 `HashRouter` 分别是按需加载的路由与固定资源路由的解决方案，[参考文章(外文)](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)，在应用之前，你应该先了解 HTML5 的 `history` 对象，[参考文章(外文)](https://medium.com/@pshrmn/a-little-bit-of-history-f245306f48dd)  

## react-router-dom 与 react-router 的区别
二者只需要引用一个即可，前者比后者多出了 `<BrowserRouter>` 和 `<Link>` 这样的 DOM 类组件，如果需要搭配 redux 则还需要引入 `react-router-redux`

## \<BrowserRouter>  
一个使用了HTML5 history API 的高阶路由组件，保证用户的 UI 界面与 URL 保持同步，拥有以下属性
1. basename : string  
给所有位置添加一个基准 URL，用途，假如你需要把页面部署到服务器的二级目录，可以使用 basename 设置到这个目录
```
<BrowserRouter basename="/article">
<Link to="React" />    // 始终是<a href="/aiticle/React">
```
2. getUserConfirmation : func
3. forceRefresh : bool
4. keyLength : number

## \<Route>

---
