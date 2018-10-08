const url = require('url');
const {pathname, query} = url.parse("https://cart.jd.com/cart.action?r=0.3662704717949117");
console.log(pathname);
console.log(query);
