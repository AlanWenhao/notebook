const net = require('net');

// socket 套接字 会话，而http有请求响应
// 是双工流
const server = net.createServer();
let port = 3000;

// 设置最大连接数，连接超过，超过的连接将会自动退出
server.maxConnections = 2;

server.on('connection', function(socket) {
    socket.setEncoding('utf-8');
    server.getConnections(function(err, count) {
        if (!err) socket.write(`当前链接人数${count}\r\n`);
    });
    // socket.end('慢走不送'); // 服务端主动断开连接，这时候客户端的连接也会断开
    socket.on('data', function(data) {
        console.log(data.toString());
        // server.close(); // 如果触发了 执行close方法，就不会再接收新的请求了，已经连接的客户端不会断开，可以继续发送数据给服务端，当所有客户端连接断开，on 监听的 close 回调执行，node 进程退出
        server.unref(); // 此方法执行后，新的客户端可以继续连接，但是，一旦所有的客户端全部退出，node 进程退出，且不会触发 on 监听的 close 事件
        // 区别，unref可以接收新的请求，close不能（就像店面挂出关门牌子一样，老的顾客可以继续服务完，新的不让进店）
    });
});

server.on('close', function() {
    console.log('服务器执行close事件，新的连接将不被接收')
});

server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
        server.listen(`${++port}`);
    }
});

server.listen(port, function() {
    console.log(`server is starting at ${port}`);
});
