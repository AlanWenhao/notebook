# 跨域备注

- 前端的请求方式fetch，它发送的请求是fetch请求，并且如果要多头做一些封装需要调用其api，底层api
- fetch 请求不能终止请求

- 启动一个node服务，写一个简单的get请求，如果在本地另外启一个服务来调用这个接口，显示跨域，只需要设置 Access-Control-Allow-Origin 为 * 即可
  - 但是客户端的请求，如果在header中设置了其他的字段，那这时候会先发送一个预检请求，OPTION，服务端需要设置 Access-Control-Allow-Headers 与 Access-Control-Allow-Methods(用于支持OPTION)请求
  - 关于OPTIONS请求，每隔几秒重新请求就会发送，可以在服务端设置 Access-Control-Max-Age 1800 来规定30分钟后再发起 OPTIONS 请求

- 设置`cookie`
  - 服务端 `res.setHeader('Set-Cookie', 'name=alan')` 仅能在相同域名端口的客户端接收到
  - 可以在客户端请求时候，设置headers，`cridentials: include`
  - 注意，一旦客户端设置`credentials`服务端就不能设置 `Access-Control-Allow-Origin` 为 `*`，且需要设置 `Access-Control-Allow-Credentials` 为 `true`

- 正向代理，反向代理
  - 正向代理可以做的，公司内网的跳板机，内网服务器需要token认证，在跳板机上做权限校验与认证
  - 反向代理可以做什么：
    - 缓存，相同的请求，不用再向服务端请求
    - CDN，用户访问CDN的时候，CDN其实是将你的请求转发到了就近的服务器
    - webpack创建代理服务器，使用npm包`http-proxy`,类似nginx，将现在服务的请求代理到目标服务器

- 根据内核判断 ua 跳转页面，临时重定向 302
  - 取到ua
  - `res.statusCode = 302`
  - res.setHeader('Location', 'http://www.a.com')

- 206 范围请求

- 多语言 Accept-Language: zh-CN;q=1,zh;q=0.9


