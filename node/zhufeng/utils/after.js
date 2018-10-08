/**
 * 函数执行到一定次数后调用callback
 * @param {Number} times 执行回调需要完成的次数
 * @param {Function} callback 回调函数
 * @return {Function}
 */
function after(times, callback) {
    const arr = [];
    return function(data) {
        arr.push(data);
        if (arr.length === times) callback();
    }
};

module.exports = after;
