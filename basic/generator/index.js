const fs = require('fs');
const { promisify } = require('util');
const readAsync = promisify(fs.readFile);

function* read() {
    const contentA = yield readAsync('a.txt', 'utf-8');
    const contentB = yield readAsync(contentA, 'utf-8');
    const contentC = yield readAsync(contentB, 'utf-8'); 
    return contentC;
}

let it = read();
let { value } = it.next(); // value 是yield返回值的value，是一个pending状态的promise
value.then((content) => {
    let { value } = it.next(content);   // 传入第一次读取的内容，得到第二个pending的promise
    value.then((content) => {
        let { value } = it.next(content);   // 传入第二次读取的内容，得到第三个pending的promise
        value.then((content) => {
            console.log(content);
        });
    })
});
