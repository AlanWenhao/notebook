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
// console.log('------------ 使用Promise类 --------------');
/* // const Promise = require('./Promise');
const promise = new Promise((resolve, reject) => {
    // setTimeout(() => {
        resolve(123);
    // }, 2000);
});

const p2 = promise.then((data) => {
    console.log('第一次then接收：', data);
    return new Promise((resolve, reject) => {
        reject(new Promise((resolve, reject) => {
            resolve('p2 resolve中返回Promise的resolve结果');
        }));
    });
});

p2.then((data) => {
    console.log('第二次then的返回值：', data);
}, (err) => {
    console.log('err', err);
}) */

// 再次使用 Promise 类
// console.log('------------ 再次使用Promise类 --------------');
/* const Promise = require('./Promise');
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('error');
    }, 2000);
});

promise.then((data) => {
    console.log('第一次then接收：', data);
    return 456;
},err => {
    console.log('第一个then的错误：', err);
}).then((data) => {
    console.log('第二次then的返回值：', data);
}, (err) => {
    console.log('第二个then的错误：', err);
}) */

// 再次使用 Promise 类
// 如果没有setTimeout的话，promise内部执行的代码也应该是异步的，也就是先打印456，后123，
// 所以promise的源码中应该将promise的then方法中执行的onFufilled和onRejected执行变成异步的(其实是微异步任务)
console.log('------------ 再次使用Promise类 --------------');
const Promise = require('./Promise');
const promise = new Promise((resolve, reject) => {
    // setTimeout(() => {
        resolve(123);
    // }, 2000);
});

promise.then((data) => {
    console.log(data);
});

console.log(456);
