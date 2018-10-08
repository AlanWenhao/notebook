const fs = require('fs');
const { resolve } = require('path'); 
const path = require('path');
const util = require('util');

/**
 * -----------------------------------------------------------
 * 基本用法
 */
/* fs.mkdir('mkdirtest', (err) => {
    if (!err) {
        console.log('创建成功');
    } else {
        console.log('出错了', err);
    }
}); */


/**
 * -----------------------------------------------------------
 * 同步创建多级目录
 */
/* function mkDirSync(dir) {
    let parts = dir.split(path.sep); // 将 a/b/c 转化成 ['a', 'b', 'c']
    parts.forEach((item, index) => {
        let current = parts.slice(0, index + 1).join(path.sep);
        try {
            fs.accessSync(current);
        } catch(err) {
            fs.mkdirSync(current);
        }
    });
}
mkDirSync('first/second/third'); */


/**
 * -----------------------------------------------------------
 * 异步创建目录 callback 形式
 */
/* function mkDirAsync(dir, callback) {
    let parts = dir.split(path.sep);
    let index = 0;
    function next() {
        if (index > parts.length) return callback && callback(); 
        index ++;
        let current = parts.slice(0, index).join(path.sep);
        fs.access(current, (err) => { // 判断当前的current目录是否存在，存在则不创建，继续，不存在创建后继续
            if (err) {
                fs.mkdir(current, (err) => {
                    if (!err) next();
                    else console.log('创建文件夹出错', err);
                });
            } else {
                next();
            }
        })
    }
    next();
}

mkDirAsync('a/b/c'); */


/**
 * -----------------------------------------------------------
 * 异步创建目录 promise 形式
 */
const mkdir = util.promisify(fs.mkdir);
const access = util.promisify(fs.access);

async function myMkDir(dir) {
    let parts = dir.split(path.sep);
    for (let i = 1; i <= parts.length; i ++) {
        let current = parts.slice(0, i).join(path.sep);
        try {
            await access(current);
        } catch(err) {
            await mkdir(current);
        }
    }
}
myMkDir('a/b/c');
