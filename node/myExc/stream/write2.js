const fs = require('fs');
// fs.createWriteStream(path, options);
const ws = fs.createWriteStream('2.txt', {
    flags: 'w',         // 文件的操作, 'w'写入文件，不存在则创建
    mode: 0o666,
    autoClose: true,
    highWaterMark: 3,   // 默认写是16k
    encoding: 'utf8'
});

let flag = ws.write('1', 'utf8', () => {});     // 异步的方法 有返回值

console.log(flag);  // true
flag = ws.write('22', 'utf8', () => {});    
console.log(flag);  // false    超过了highWaterMark的3个字节，不能再写了
flag = ws.write('3', 'utf8', () => {}); 
console.log(flag);  // false
