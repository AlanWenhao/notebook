// stdin stdout 方法
/* process.stdin.resume(); // 在旧模式下，stdin流默认是暂停额，需要使用resume方法来恢复它
process.stdin.setEncoding('utf-8');
process.stdin.on('data', function(data) {
    console.log(data);
}); */


/* process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        process.stdout.write(`output is: ${chunk}`);
        // process.stdin.end()
    }
});
process.stdin.on('end', () => { // 这里的end不会触发，不知道为什么
    process.stdout.write('end');
}); */

let fs = require('fs');
let time = process.hrtime();
let data = fs.readFileSync('index.txt');
let diff = process.hrtime(time);
console.log(`读文件操作耗费的%d毫秒`,diff[1]/1000000);