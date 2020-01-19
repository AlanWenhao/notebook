const http = require('http');
const path = require('path');
const fse = require('fs-extra');
const multiparty = require('multiparty');

const UPLOAD_DIR = path.resolve(__dirname, 'target');
const server = http.createServer();

server.on('request', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTION') {
        res.status = 200;
        res.end();
        return;
    }
    
    const form = new multiparty.Form();
    console.log(req.headers)
    form.parse(req, async (err, fields, files) => {
        res.writeHead(200, {'content-type': 'text/plain'});
        if (err) {
            return console.log('err', err)
        }
        const [chunk] = files.chunk;
        const [hash] = fields.hash;
        const [filename] = fields.filename;
        const chunkDir = `${UPLOAD_DIR}/${filename}`;

        if (!fse.existsSync(chunkDir)) {
            await fse.mkdirs(chunkDir);
        }
        await fse.move(chunk.path, `${chunkDir}/${hash}`);
        res.end('received file chunk');
    })
})

server.listen(3000, () => console.log('server is running on port 3000'))
