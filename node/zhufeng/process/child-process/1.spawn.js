const { spawn } = require('child_process');
const path= require('path');

const child = spawn('node', ['sub_process1.js', '--port', '3000'], {
    cwd: path.join(__dirname, 'output'),
    stdio: ['pipe']
    // stdio:[process.stdin,process.stdout,process.stderr]
});

child.stdout.on('data', (data) => {
    // 子进程调用process.stdout.write传输的信息
    console.log(data.toString());
});

child.stderr.on('data', (data) => {
    // 子进程调用process.stderr.write传输的信息
    console.log(data.toString());
});