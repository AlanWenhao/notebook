const fs = require('fs');
const { resolve } = require('path');

const copy = () => {
    fs.readFile(resolve(__dirname, '1.txt'), (err, data) => {
        if (!err) {
            fs.writeFile(resolve(__dirname, 'text.txt'), data, {flag: 'a'}, (err) => { // flag默认w，a代表追加
                if (!err) console.log('copy完成');
            });
        }
    });
}
copy();
