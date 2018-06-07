const fs = require('fs');
const path = require('path');

const fileName = 'test.js';
const sourceFile = path.join(__dirname, fileName);
const destPath = path.join(__dirname, 'dest', fileName);

const readStream = fs.createReadStream(sourceFile); // 返回一个可读流对象
const writeStream = fs.createWriteStream(destPath);

readStream.pipe(writeStream); // 要求制定的目标文件夹必须存在
console.log('移动完成');
