/**
 * 基础用法
 */
const fs = require('fs');
const { resolve }  = require('path');
// fs.readFile(resolve(__dirname, 'text.txt'), (err, data) => {
//     if (err) console.error(err);
//     console.log(data);
// });


fs.writeFile(resolve(__dirname, '1.txt'), Buffer.from('123'), { flag: 'a' }, (err) => {
    if(!err) {
        console.log('done!');
    }
});
