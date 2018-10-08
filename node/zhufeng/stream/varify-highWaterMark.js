const fs = require('fs');

let count = 0;
const ws = fs.createWriteStream('testInput.txt');
for (let i = 0; i < 10000; i ++) {
    count ++;
    let flag = ws.write(i.toString());
    if (!flag) { // 返回false即到达了highWaterMark
        console.log('写入' + count + '次');
        break;
    }
}

ws.end(function() {
    console.log('文件写入结束，输出的总字节为', ws.bytesWritten);
});

ws.on('drain', function() {
    console.log('缓存区已满，内存中的数据已被全部消费');
});
