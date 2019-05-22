/**
 * 读文件 fs.read
 */
const fs = require('fs');
const { resolve } = require('path');

// 文件太大不能放到内存中
// 文件大小未知
fs.open(resolve(__dirname, './1.txt'), 'r', 0o666, function(err,fd) {
    let buf = Buffer.alloc(6);
    fs.read(fd, buf, 0, 6, 6, function(err, bytesRead, buffer) {
        console.log(bytesRead);
        console.log(buffer===buf);
        console.log(buf.toString());
    })
})

/**
 * fs.read 参数
 * fd          文件描述符
 * buffer      数据将被写入的buffer
 * offset      buffer开始写入的位置
 * length      读取的长度
 * posiiton    指定文件中开始读取的位置
 * callback    回调函数(err, byteRead, buffer)
 */
