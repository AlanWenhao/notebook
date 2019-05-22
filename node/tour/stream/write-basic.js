const fs = require('fs');

const ws= fs.createWriteStream('a.txt', {
    encoding: 'utf-8',
    highWaterMark: 3
})

const flag1 = ws.write('0123456789', 'utf-8', () => {
    console.log('写入');
});
const flag2 = ws.write('9876543210', 'utf-8', () => {
    console.log('写入');
});
console.log(flag1);
console.log(flag2);
