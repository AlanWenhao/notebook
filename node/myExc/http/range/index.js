const http = require('http');
const fs = require('fs');
const util = require('util');
const path = require('path');
const filePath = path.join(__dirname, '1.txt');

const stat = util.promisify(fs.stat);

async function listener(req, res) {

}

const server = http.createServer(listener);
server.listen(3000, () => {
    console.log('server is started on http://localhost:3000');
});

