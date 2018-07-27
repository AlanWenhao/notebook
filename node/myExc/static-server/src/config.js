const { join } = require('path');

const config = {
    hostname: '127.0.0.1',
    port: 3000,
    dir: join(__dirname, '..', 'public'),
}

module.exports = config;
