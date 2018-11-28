/**
 * 给开头结尾添加 #
 */
function addMark(str) {
    return str.replace(/^|$/g, '#');
}
// console.log(addMark('123'));

/**
 * 数字的千位分隔符表示法
 */
function thoundGutter(str) {
    return str.replace(/(?!^)(?=(\d{3})+$)/g, ',');
}
// console.log(thoundGutter('123456789'));

/**
 * 连续的千位分割
 */
function multiThoundGutter(str) {
    return str.replace(/\B(?=(\d{3})+\b)/g, ',');
}
// console.log(multiThoundGutter('12345678 123456789'));

/**
 * 货币格式化
 */
function moneyFormat(num) {
    return num.toFixed(2).replace(/(?!^)(?=(\d{3})+\b)/g, ',').replace(/^/, '$');
    // return num.toFixed(2).replace(/(?!^)(?=(\d{3})+\.)/g, ',').replace(/^/, '$');
}
// console.log(moneyFormat(1234));

/**
 * 要求必须包含数字
 */
function hasNum(str) {
    return str.replace(/(?=.*[0-9])/, '#')
}
// console.log(hasNum('9u74h5tg89j'));

/**
 * 替换电弧号码中间的四位
 */
// function hidePhoneNum(str) {
//     return str.replace(/(?!([0-9]{3}))/, '*');
// }
// console.log(hidePhoneNum('13454782783'));
