const { spawn } = require('child_process');

// const cp = spawn('wc');

// process.stdin.pipe(cp.stdin);

// cp.stdout.on('data', (data) => {
//     console.log(`child process stdout:\n${data}`);
// });

const find = spawn('find', ['.', '-type', 'f']);

const wc = spawn('wc', ['-l']);

find.stdout.pipe();
