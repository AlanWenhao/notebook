var regex = /(\d{4})-(\d{2})-(\d{2})/;
var str = '2017-10-08';

regex.test(str);
// 正则操作即可，例如
// regex.exec(string);
// string.match(regex);

console.log(RegExp.$1);
console.log(RegExp.$2);
console.log(RegExp.$3);