# Tips

- <Freagment> react16 新增的代码片段，用于替换react组件的根div，经过编译后不会产生div
- 理解 saga 中的 `put` `call` `all` 方法
- 使用session保存登录状态的，即服务端保存登录状态的，需要调用接口通知服务端删除登录记录，而使用 jwt，因为服务端没有存储登录状态，直接在客户端删除本地存储既可