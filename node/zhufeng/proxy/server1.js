/**
 * 服务器代理功能，正向代理
 */
const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://localhost:3000' });
    proxy.on('error', (err) => {
        console.log(err);
    });
}).listen(8080);
