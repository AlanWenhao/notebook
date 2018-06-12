// isType 函数的使用
/* console.log('------------ 使用isType函数 --------------');
const { isArray, isString } = require('./isType');
console.log(isArray([1,2,3,3]));
console.log(isString('123')); */

// 使用 after
/* console.log('------------ 使用after函数 --------------');
const fs = require('fs');

const after = require('./after');
const doTimes = after(2, function() {
    console.log('两次异步任务全部执行完毕');
});
fs.readFile('./utils/after.js', 'utf-8', function(err, data) {
    doTimes(data);
});
fs.readFile('./utils/isType.js', 'utf-8', function(err, data) {
    doTimes(data);
}); */

// 使用 Promise 类
console.log('------------ 使用Promise类 --------------');
const Promise = require('./Promise');
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(123);
    }, 2000);
});

promise.then((data) => {
    console.log(data);
});
