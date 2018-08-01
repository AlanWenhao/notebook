/**
 * 简单爬虫
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function(req, res) {
    const client = http.request({
        host: 'news.baidu.com',
        method: 'get',
        port: 80
    }, function(response) {
        const outStream = fs.createWriteStream(path.join(__dirname, 'output.html'));
        response.pipe(outStream);

        let arr = [];

        response.on('data', function(data) {
            arr.push(data);
        });
        response.on('end', function() {
            console.log(arr.length);
            const result = Buffer.concat(arr).toString();
            const matches = result.match(/<li class="bold-item"([\s\S]*?)<\/li>/gm);
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(matches.join(''));
        });
    });

    client.end()
}).listen(3000);
