/**
 * 自己实现 copy 方法
 * 原理：open => read => write
 * 注意：srcFile不存在 => 报错   destFile不存在=> 创建 destFile
 */
const fs = require('fs');
const { resolve } = require('path')
const BUFFER_SIZE = 3;

function copy(srcFile, destFile) {
    fs.open(resolve(__dirname, srcFile), 'r', (err, readFd) => {
        fs.open(resolve(__dirname, destFile), 'w', (err, writeFd) => {
            const bufContainer = Buffer.alloc(BUFFER_SIZE);
            let readed = 0;
            let writed = 0;
            function next() {
                fs.read(readFd, bufContainer, 0, BUFFER_SIZE, readed, (err, bytesWrite) => {
                    readed += bytesWrite;
                    bytesWrite && fs.write(writeFd, bufContainer, 0, bytesWrite, writed, (err, bytesWrite) => {
                        writed += bytesWrite;
                        next();
                    })
                } )
            }
            next();
        })
    });
}

copy('6.txt', '2.txt');
