// node 的核心模块 zlib
const zlib = require('zlib');
const path = require('path');
const fs = require('fs');
const p = path.join(__dirname, '1.txt');

// 压缩1.txt.gz
// 这里可以将 8k 的文件压缩成 115b
function gzip(path) {
    const gzip = zlib.createGzip(); // 是一个转化流,所以下面可以通过pipe连接读写流
    const inputStream = fs.createReadStream(path);
    const outputStream = fs.createWriteStream(path + '.gz');
    inputStream.pipe(gzip).pipe(outputStream);
}

gzip(p);
