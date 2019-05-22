/**
 * curl -v --header "Range: bytes=2-100" http://www.baidu.com
 * 请求头如果带有 Range头， Range: bytes=0-100
 * 响应头 Accept-Range、Content-Range
 */

const http = require('http');
const fs = require('fs');
const util = require('util');
const path = require('path');
const filePath = path.join(__dirname, '1.txt');

const stat = util.promisify(fs.stat);

async function listener(req, res) {
    const range = req.headers['range'];
    if(range) {
        let [, start, end] = req.headers.range.match(/(\d*)-(\d*)/);
        const statObj = await stat(filePath);
        const total = statObj.size;
        start = start ? Number(start) : 0;
        end = end ? Number(end) : total - 1;
        res.statusCode = 206;
        res.setHeader('Accept-Range', 'bytes');
        res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`);
        res.setHeader('Content-Length', end - start + 1);

        fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
        fs.createReadStream(filePath).pipe(res);
    }
}

const server = http.createServer(listener);
server.listen(3000, () => {
    console.log('server is started on http://localhost:3000');
});

