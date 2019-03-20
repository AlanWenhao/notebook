const net = require('net');
const fs = require('fs');
const path = require('path');

const destPort = 80;
const destHost = '60.12.217.41';

let allBuffer = null;

const client = net.createConnection(destPort, destHost, function() {
    console.log('connect to server');
    client.write('GET / HTTP/1.0/r/nAccept: text/html/r/nCache-Control: no-cache/r/nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36/r/n/r/n');
});

client.on('data', function(data) {
    console.log('recieve data');
    if (!allBuffer) {
        allBuffer = data;
    } else {
        allBuffer.concat([allBuffer, data]);
    }
});

client.on('error', function(err) {
    console.log(err);
});

client.on('end', function() {
    console.log('connect end');
    if (allBuffer === null) return console.log('no data recieved~~~');
    const htmlContent = allBuffer.toString();
    const ws = fs.createWriteStream(path.join(__dirname, 'output.html'));
    ws.write(htmlContent);
});
