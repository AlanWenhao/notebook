var regex = /(\d{4})-(\d{2})-(\d{2})/;
var str = '2017-10-08';

regex.test(str);
// 正则操作即可，例如
// regex.exec(string);
// string.match(regex);

console.log(RegExp.$1);
console.log(RegExp.$2);
console.log(RegExp.$3);


/**
 * 模拟 trim 方法
 */

function myTrim(str) {
    return str.replace(/^\s*|\s*$/g, '');
}
console.log(myTrim('  abc  '));

function myTrim(str) {
    return str.replace(/^\s*(.*?)\s*$/g, '$1');
}
console.log(myTrim('  abc  '));

/**
 * 将每个单词的首字母转化成大写
 */
function upercaseEvery(str) {
    return str.replace(/\b\w/g, function(letter) {
        console.log(letter);
        return letter.toUpperCase();
    })
}
console.log(upercaseEvery('abcd efg hijk lmn'))

/**
 * 驼峰化
 * react-router-dom => ReactRouterDom
 */
function calmelCase(str) {
    return str.replace(/(?:^|-)(\w)/g, function(dashLetter, letter) {
        return letter.toUpperCase();
    });
}
console.log(calmelCase('react-router-dom'));