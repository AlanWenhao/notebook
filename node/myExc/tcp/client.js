// 创建TCP客户端
const net = require('net');

const socket = net.createConnection({port: 3000}, () => {
    socket.on('data', (data) => {
        console.log(data.toString());
    });
});
