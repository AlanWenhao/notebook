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

/* --------------------- 案例分析 ----------------------- */

/**
 * 匹配16进制颜色
 * #ffbbad
 * #Fc01Df
 * #FFF
 * #ffE
 * #三个或六个数字字母
 */
function matchHexColor(str) {
    const regexp = /^#([0-9a-zA-Z]{3}|[0-9a-zA-Z]{6})$/g;
    return regexp.test(str);
}

// console.log(matchHexColor('#ffE'));


/**
 * 匹配24小时制时间
 */
function match24Hour(str) {
    const regexp = /^(0?\d|[1]\d|[2][0-3]):(0?[0-9]|[1-5][0-9])$/g;
    return regexp.test(str);
}


/**
 * 匹配日期 yyyy-mm-dd
 */
function matchDate(str) {
    const regexp= /^\d{4}-(0[0-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return regexp.test(str);
}

/**
 * 惰性匹配在这里会起到作用
 * 匹配 id
 * <div id="container" class="main"></div>
 */
function matchHtmlId(str) {
    return str.match(/id=".*?"/);
}
console.log(matchHtmlId('<div id="container" class="main"></div>')[0]);


