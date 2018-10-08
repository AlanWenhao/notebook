const http = require('http');
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer();

// 记得更改 hosts 文件
const option = {
    'alan1.cn': 'http://localhost:3000',
    'alan2.cn': 'http://localhost:3001'
};

http.createServer((req, res) => {
    let host = req.headers['host'];
    console.log(host);
    proxy.web(req, res, { target: option[host] });
    proxy.on('error', (err) => {
        console.log(err);
    });
}).listen(80);
