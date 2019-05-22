const net = require('net');

const server = net.createServer((socket) => {
    socket.write('hello');
});

server.listen('3000');
