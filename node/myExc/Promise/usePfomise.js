const myPromise = require('./Promise');
const promise = new myPromise((resolve, reject) => {
    setTimeout(function() {
        resolve('执行成功');
    }, 3000);
});

promise.then(function(data) {
    console.log(data);
}, function(err) {
    console.error(err);
});
