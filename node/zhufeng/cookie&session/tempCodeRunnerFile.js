const crypto = require('crypto');
const scret = 'Alan1';
let str = crypto.createHmac('sha256', scret).update('123456').digest('base64');
console.log(str);