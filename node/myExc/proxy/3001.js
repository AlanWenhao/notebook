const http = require('http');

http.createServer((req, res) => {
    res.end('this is 3001 port');
}).listen(3001);