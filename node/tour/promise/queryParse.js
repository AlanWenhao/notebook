const str = '&aa=1&b=2&c=3';

function queryParser(str) {
    let obj = {};
    // 如果指定 /g 就意味着要被替换多次，那这个方法将会被调用多次，每次匹配都会被调用
    str.replace(/[?&]([^=&#]+)=([^&#]*)/g, function() {
        console.log('args', arguments);
        obj[arguments[1]] = arguments[2];
    })
    return obj
}

console.log(queryParser(str));
