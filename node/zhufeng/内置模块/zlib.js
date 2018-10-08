const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const filePath = './test.json';

const server = http.createServer(function(req, res) {
    const acceptEncoding = req.headers['accept-encoding'];
    let gzip;

    if (acceptEncoding.indexOf('gzip') !== -1) {
        gzip = zlib.createGzip();

        // 告知浏览器压缩方式
        res.writeHead(200, {
            'Content-Encoding': 'gzip'
        });

        fs.createReadStream(filePath).pipe(gzip).pipe(res);
    } else {
        fs.createReadStream(filePath).pipe(res);
    }
});

server.listen(3000);
