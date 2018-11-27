/**
 * 给开头结尾添加 #
 */
function addMark(str) {
    return str.replace(/^|$/g, '#');
}
console.log(addMark('123'));
