const http = require('http');

http.createServer((req, res) => {
    res.end('this is 3000 port');
}).listen(3000);
