// ctx 需要整合 req,res
// 封装request和response对象 把他放到ctx上

let context = require('./context');
let response = require('./response');
let request = require('./request');
let EventEmitter = require('events');
let Stream = require('stream');
// 需要导出一个Koa类
const http = require('http');
class Application extends EventEmitter {
    constructor() {
        super();
        this.context = context;
        this.response = response;
        this.request = request;
        this.middlewares = [];
    }
    use(fn) { // 注册方法
        this.middlewares.push(fn);
    }
    createContext(req, res) {
        // 不会破坏原有对象，方便扩展，比如用户使用koa的时候，在response上新加了自定义的属性，也不会影响原生的response
        let context = Object.create(this.context);
        context.request = Object.create(this.request);
        context.response = Object.create(this.response);
        // 我在koa的自己封装的对象上增加 req 和res属性
        context.req = context.request.req = req;
        context.res = context.response.res = res;
        return context;
    }
    compose(ctx) {
        // [fn,fn,fn]
        // async + await  / reduce + compose
        let dispatch = (index) => {
            if (index == this.middlewares.length) return Promise.resolve();// 返回一个成功的 
            let middle = this.middlewares[index];
            // 拿出第一个中间件 让其执行，执行的时候传递ctx,next方法，有可能这个方法是一个普通函数，那么就把他变成一个promise
            return Promise.resolve(middle(ctx, () => dispatch(index + 1)));
        }
        return dispatch(0);
    }
    handleRequest(req, res) {
        // 创建上下文
        let ctx = this.createContext(req, res);
        this.compose(ctx).then(() => {
            let _body = ctx.body;
            if (_body instanceof Stream) {
                return _body.pipe(res);
            } else if (typeof _body === 'object') {
                return res.end(JSON.stringify(_body));
            } else {
                return res.end(_body);
            }
            res.end(_body);
        }).catch(err => { // 错误处理
            this.emit('error', err)
        })
    }
    listen(...args) { // 监听端口号
        let server = http.createServer(this.handleRequest.bind(this));
        server.listen(...args);
    }
}

module.exports = Application;