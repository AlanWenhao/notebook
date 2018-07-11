const fs = require('fs');
const { resolve } = require('path');

fs.open(resolve(__dirname, '1.txt'), 'r', (err, fd) => {
    if (!err) {
        console.log('file is opening, fd is: ', fd);
    }
})
