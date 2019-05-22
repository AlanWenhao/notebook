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
});