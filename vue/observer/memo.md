# vue 重要知识点
- vue默认会递归所有的数据，给他们增加getter和setter
- 如果vue数据中没有一个值，需要通过$set来将其设置为响应式数据
- 如果一个数据是数组，数组里放的是对象，更改第 n 个对象中的属性，是会相应的，但是数组里放的不是对象而是原始数据，则不会响应式
- 修改数组索引与长度是不会触发更新的
- 数组 push unshift splice 才会触发数据监听

- 总结
  - 对象会被vue监听
  - 数组的某些方法，vue 通过改写原型的方法，使其调用observer函数，将其监听
