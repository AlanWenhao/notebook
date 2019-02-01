# react ssr

## 笔记
- `react` 在`node`端转化成html字符串需要的 `import { renderToString } from 'react-dom`
- webpack 配置 `node` 端打包配置文件的时候可以设置 `target` 为 `node`
- webpack 默认会将node文件中需要引入的 node 核心代码打包到 `bundle.js` 中，借助 `webpack-node-externals` 可以避免

