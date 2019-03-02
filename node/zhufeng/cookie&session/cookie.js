const http = require('http');
let querystring = require('querystring');
const crypto = require('crypto');

http.createServer(function(req, res) {
    console.log('server is running');

    const sign = value => require('crypto').createHmac('sha256', value).update(value.toString()).digest('base64').replace(/[+/]/g, '');
    let arr = [];
    res.setCookie = (key, value, options = {}) => {
        let optionsArr = [];
        if (options.maxAge) {
            optionsArr.push(`Max-Age=${options.maxAge}`);
        }
        if (options.signed) {
            value = `${value}.${sign(value)}`;
        }
        arr.push(`${key}=${value}; ${optionsArr.join('; ')}`);
        console.log(arr);
        res.setHeader('Set-Cookie', arr)
    }

    res.getCookieSigned = (key) => {
        const cookies = querystring.parse(req.headers.cookie, '; ') || {};
        console.log('读取到的cookie', typeof cookies);
        if (cookies[key]) { // 如果有cookie
            let [value, signValue] = cookies[key].split('.');
            if (sign(value) === signValue) {
                return value;
            }
        }
        return '';
    }

    if (req.url === '/read') {
        const cookies = querystring.parse(req.headers.cookie, '; ') || {};
        res.end(JSON.stringify(cookies));
    }
    if (req.url === '/readsign') {
        console.log('read');
        res.end(res.getCookieSigned('name'));
    }
    if (req.url === '/write') {
        // 这样连续设置，仅会设置一个cookie，age=18
        // res.setHeader('Set-Cookie', 'name=Alan');
        // res.setHeader('Set-Cookie', 'name=Ben');
        // res.setHeader('Set-Cookie', 'age=18');

        // 要想设置多个
        // res.setHeader('Set-Cookie', ['name=Alan', 'age=18']);
        // res.end('write ok');

        // domain 设置
        // res.setHeader('Set-Cookie', ['name=Alan; domain=a.test.com', 'age=18']);

        // 这样设置就能够在 *.test.com 下访问到获取到 cookie
        // res.setHeader('Set-Cookie', ['name=Alan; domain=.test.com', 'age=19']);
        // res.end('write ok');

        // 
        // res.setHeader('Set-Cookie', ['test=Alan; domain=.test.com; path=/write; max-age=10; HttpOnly'], );
        // res.end('write ok');

        res.setCookie('name', 'Cherish', {
            maxAge: 60,
            signed: true
        });
        res.end('write ok');
    }
}).listen(3000);


/**
 * 三次加密后一般无法查到
 */
// const crypto = require('crypto');
// let str = crypto.createHash('md5').update('123456').digest('base64');
// str = crypto.createHash('md5').update(str).digest('base64');
// str = crypto.createHash('md5').update(str).digest('base64');
// console.log(str);

/**
 * 加盐加密
 */
// const crypto = require('crypto');
// const scret = 'Alan1';
// let str = crypto.createHmac('sha256', scret).update('123456').digest('base64');
// console.log(str);
