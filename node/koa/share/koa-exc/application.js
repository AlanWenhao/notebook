const EventEmitter = require('events');
const http = require('http'); 

class Koa extends EventEmitter {
    constructor() {
        this.middleware = [];
    }

    use(fn) {
        this.middleware.push(fn);
    }
    callback() {
        
    }

    listen() {
        const server = http.createServer(this.callback());
        return server.listen.apply(server, arguments);
    }
}
