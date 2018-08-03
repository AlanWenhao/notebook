const querystring = require('querystring');
const http = require('http');

function createApplication() {
    const app = function(req, res) {
        const [realPath, query = ''] = req.url.split('?');
        req.path = realPath;
        req.query = querystring.parse(query);
    }

    app.listen = function() {
        const server = http.createServer(app);
        server.listen(...arguments);
    }

    return app;
}

module.exports = createApplication;
