const fs = require('fs');

// 同步读取，直接data = readFileAync()...., 如果是异步就要在回调里接收，err, data
let data;
data = fs.readFileSync('./test.json', 'utf-8', (err) => {
    console.log(err);
});
console.log(data);
