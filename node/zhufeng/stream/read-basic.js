const fs = require('fs');

const rs = fs.createReadStream('text.txt', {
    encoding: 'utf-8',
    highWaterMark: 100,
});

rs.on('data', (datas) => {
    console.log(datas);
    rs.pause();
    console.log('stream is paused now');
});

fs.createWriteStream('a.txt', {
    
});

rs.resume();
