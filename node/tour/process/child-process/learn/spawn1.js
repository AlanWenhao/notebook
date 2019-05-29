const { spawn }  = require('child_process');

// const child = spawn('pwd');
// const child = spawn('find', ['~/alan', '-name', 'cpmh.png']);
const child = spawn('ls', ['-a']);

child.stdout.on('data', (data) => {
    console.log('子进程stdout: \n', data.toString());
})

child.stderr.on('data', (err) => {
    console.log('the error is', err.toString());
});

child.on('exit', (code, signal) => {
    console.log(`child process exited with code ${code} and signal ${signal}`);
});

// 上面 spawn 函数执行的结果是一个子进程，并且这个子进程实例继承自 EventEmitter，所以可以对时间进行监听
// ChildProcess 实例上还可以注册 disconnect、error、close 和 message 事件。


