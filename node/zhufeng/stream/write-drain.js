const fs = require('fs');

const ws = fs.createWriteStream('2.txt', {
    encoding: 'utf-8',
    highWaterMark: 3
});

let i = 10;
function write() {
    let flag = true;
    while(i && flag) {
        flag = ws.write('1');
        i --;
        console.log(flag);
    }
}

write();

ws.on('drain', () => {
    console.log('drain');
    write();
});

