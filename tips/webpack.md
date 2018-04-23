# webpack
- webpack优秀文章
- webpack自我笔记

## webpack优秀文章
[webpack3的一些介绍有优化配置](https://github.com/taikongfeizhu/webpack3-in-action)

## webpack自我笔记
### externals
防止将某些`import`的包打包到bundle中，而是在运行时再去外部(通常是CDN)获取依赖，更加详细设置请移步[webpack文档](https://doc.webpack-china.org/configuration/externals/#src/components/Sidebar/Sidebar.jsx)
```js
// 通常会排除的文件
externals: {
    axios: 'axios',
    react: 'React',
    redux: 'Redux',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'react-router-dom': 'ReactRouterDOM',
    'prop-types': 'PropTypes'
}
```

下面的jquery只会在运行时引入，不会最终打包到js文件中，eg：
```
// index.html
<script
    src="https://code.jquery.com/jquery-3.1.0.js"
    integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
    crossorigin="anonymous">
</script>

// webpack.config.js
externals: {
    // 属性名称是 jquery，表示应该排除 import $ from 'jquery' 中的 jquery 模块。为了替换这个模块，jQuery 的值将被用来检索一个全局的 jQuery 变量。换句话说，当设置为一个字符串时，它将被视为全局的（定义在上面和下面）
    jquery: 'jQuery'
}

// main.js
import $ from 'jquery';
$('.me-element').animate(...);

```
