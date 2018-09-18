# simple-jwt

## 插件
- express
- morgan          记录日志
- jsonwebtoken
- bcryptjs        加密
- mongoose
- cors            服务端支持跨域

## TIPS
- `model/user` connection.model() 可以定义模型，也可以获取模型
- 新的 `express` 不需要使用 `body-parser`，只需要 `app.use(express.json())`， `express.urlencoded({ extended: true })`
- 