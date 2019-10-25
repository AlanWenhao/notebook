let context = {
    
}

// 代理的功能
// Object.defineProperty(obj,'url',{
//     get(){},
//     set(newValue){}
// })
function defineGetter(property,key){
    context.__defineGetter__(key,function(){
        // 这里的this指代的是context，这个context是我们自己创建的
        // let ctx = Object.create(context)
        return this[property][key];
    });
}
function defineSetter(property,key){
    context.__defineSetter__(key,function(newValue){
        this[property][key] = newValue
    })
}
// ctx.url => ctx.request.url
defineGetter('request','url');
defineGetter('request','method');
defineGetter('request','path');
defineGetter('response','body');

defineSetter('response','body');
// 实现代理功能
module.exports = context;