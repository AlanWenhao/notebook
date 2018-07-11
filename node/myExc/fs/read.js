const fs = require('fs');
const { resolve } = require('path');

fs.open(resolve(__dirname, '1.txt'), 'r', (err, fd) => {
    let buffer = Buffer.alloc(6)
    fs.read(fd, buffer, 0, 3, 3, (err, bytesRead) => {
        if (!err) {
            console.log('buffer is:', buffer);
            console.log('bytesRead is:', bytesRead);
        }
    });
});
