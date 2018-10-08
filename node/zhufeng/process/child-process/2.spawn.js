/**
 * 在主进程中开启两个子进程，先运行第一个进程给他传递一些参数，将参数去除返还给主进程，主进程再把结果传递给另一个子进程写入文件
 */

const { spawn } = require('child_process');
const path = require('path');
const child1 = spawn('node', ['child1.js', 'a', 'b'], {
    cwd: path.join(__dirname, 'output'),
});
const child2 = spawn('node', ['child2.js'], {
    cwd: path.join(__dirname, 'output'),
});

child1.stdout.on('data', (data) => {
    // 拿到结果，主进程往2里面写
    child2.stdout.write(data.toString());
});
