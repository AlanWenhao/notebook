/**
 * 得到匹配符合规范的【所有字符】
 * @param {String} value 
 * @returns {Array}
 */
function getABC(value) {
    return value.match(/ab{2,5}c/g);
}
// console.log(getABC("a0b a1b a2b a3b a4b"));

/**
 * 范围匹配
 * @param {String} value 
 */
function wild(value) {
    return value.match(/[^]/g);
}

// console.log(wild('1231a1aM3M')); // [ '1', '2', '3', '1', 'a', '1', 'a', 'M', '3', 'M' ]



