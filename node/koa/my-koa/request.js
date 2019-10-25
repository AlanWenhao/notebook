let url = require('url');
// 扩展request属性
let request = {
    get url(){ // 属性访问器 h5的方法可以帮助我们处理复杂逻辑
        // console.log(this === ctx.request);
        return this.req.url;
    },
    get method(){
        return this.req.method
    },
    get path(){
        return url.parse(this.req.url).pathname
    }
}
module.exports = request
