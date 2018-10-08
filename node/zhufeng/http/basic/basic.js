const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log(req.method); // 这个方法名是大写的
    console.log(req.url); // 路径
    console.log(req.httpVersion); 
    console.log(req.headers); // 请求头
    let arr = [];
    req.on('data',function(data){
        arr.push(data);
    });
    req.on('end',function(){
        console.log(Buffer.concat(arr).toString());
    });
    // ------------------------------
    // 响应
    // res.writeHead(200,{'Content-Type':'text','a':'1'});
    
    res.setHeader('Content-Type','text');
    res.setHeader('a','1');
    res.sendDate = false;
    //res.write('hello');
    res.end('hello');
});

server.on('connection', () => {
    console.log('链连接功');
});

server.listen(3000);
