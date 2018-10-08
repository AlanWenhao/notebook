const str = 'a=1&b=2&c=3';

function queryParser(str) {
    let obj = {};
    str.replace(/([^=&+])=([^=&+])/g, function() {
        obj[arguments[1]] = arguments[2];
    })
    return obj
}

console.log(queryParser(str));
