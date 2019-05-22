/**
 * 强类型检测函数
 */


/**
 * 核心代码
 * @param {String} type JS数据类型
 */
function isType(type) {
    return function(content) {
        const originType = Object.prototype.toString.call(content);
        const result = originType.replace(/\[object\s+|\]/g, '');
        return result === type;
    }
}

// see:
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
const TypeArr = ['Array', 'Object', 'Function', 'Boolean',
    'NULL', 'String', 'Number', 'Date', 'Math', 'Undefined'];
const util = {};

TypeArr.forEach((item) => {
    util[`is${item}`] = isType(item);
});

module.exports = util;
