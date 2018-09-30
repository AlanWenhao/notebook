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
- mongoose 钩子 可以在保存前保存后对数据进行操作，这种机制类似express的中间件，注意钩子中的 `this` 指向 `model/user.js`
- 加密，最基本的使用 `md5`、`hash`、`sha1` 进行加密，但是这种东西容易被映射破解，所以一般都使用加盐的加密算法 `hmac`
- 可以在schema上，通过给methods增加属性，可以给实例扩展方法
- jwt.sign(payload, secretOrOrivateKey, passphrase);中间的秘钥非常重要，仅能存储在服务端，保密性要求非常高，比如有很多连锁店铺，那么他们需要拥有相同的秘钥
- https://jwt.io 在这里可以解密token
- 使用 JWT 可以做到后台不保存登录状态