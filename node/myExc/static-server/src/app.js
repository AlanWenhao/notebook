const fs     = require('fs');
const url    = require('url');
const http   = require('http');
const path   = require('path');
const util   = require('util');
const zlib   = require('zlib');
const swig   = require('swig');
const mime   = require('mime');       // 内容类型
const chalk  = require('chalk');      // 粉笔
const crypto = require('crypto');
const debug  = require('debug')('*'); // 根据环境变量打印输出

// 1、指定主机名、端口号、静态文件存放目录
const CONFIG = require('./config');

const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const templateStr = swig.compileFile(path.join(__dirname, 'index.html'));

class Server {
    constructor() {
        this.config = CONFIG;
        this.templateStr = templateStr;
    }
    /**
     * 处理请求
     * @param {*} req
     * @param {*} res
     */
    async handleRequest(req, res) {
        const { pathname } = url.parse(req.url, true);
        const localPath = path.join(this.config.dir, pathname);

        if (pathname === '/favicon.ico') { // 如果是'/favicon.ico'不处理当前请求
            res.end();
            return;
        }
        
        try { // 判断当前目录是否存在,如果是路径，显示路径,如果是文件，显示文件
            const statObj = await stat(localPath);
            if (statObj.isDirectory()) { // 判断是否是文件夹
                const dirs = await readdir(localPath);
                const dirsArr = dirs.map(dir => {
                    return {
                        name: dir,
                        path: path.join(pathname, dir),
                    }
                });
                const tplStr = templateStr({ dirsArr });
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(tplStr);
            } else { // 不是文件夹就是文件
                this.sendFile(req, res, localPath, statObj);
            }

            // res.end(util.inspect(statObj.__proto__).toString());
        } catch (err) {
            this.sendErr(req, res, err);
        }
    }

    /**
     * 
     * @param {Object} req 原生req
     * @param {Object} res 原生res
     * @param {String} localPath 当前请求地址对应文件的绝对路径
     * @param {*} stat 当前文件的状态，缓存压缩等等功能用到
     */
    async sendFile(req, res, localPath, statObj) {
        // 判断文件是否已经缓存，设置状态码
        // this.needCache(req, res, localPath, stat);
        if (await this.needCache(req, res, localPath, statObj)) {
            res.statusCode = 304;
            res.end();
            return;
        }

        // 压缩，如果有压缩，就返回压缩后的 zip 流
        res.setHeader('Content-type', mime.getType(localPath) + ';charset=utf-8');
        const zip = this.compress(req, res, localPath, statObj);
        if (zip) {
            return fs.createReadStream(localPath).pipe(zip).pipe(res);
        }

        // 范围请求range，如果有范围请求，返回部分内容
        if (this.range(req, res, localPath, statObj)) {
            return;
        }

        fs.createReadStream(localPath).pipe(res);
    }

    // 文件缓存
    async needCache(req, res, localPath, statObj) {
        res.setHeader('Cache-Control', 'max-age=1000');
        res.setHeader('Expires', new Date(Date.now() + 1000 * 1000).toGMTString());
        const etag = await this.md5Encoding(localPath);
        const lastModified = statObj.ctime.toGMTString();

        res.setHeader('Etag', etag);
        res.setHeader('Last-Modified', lastModified);

        const ifNoneMatch = req.headers['if-none-match'];
        const ifModifiedSince = req.headers['if-modified-since'];
        if (lastModified !== ifModifiedSince) return false;
        if (etag !== ifNoneMatch) return false;
        return true;
    }

    // 压缩文件
    compress(req, res, localPath, statObj) {
        const encoding = req.headers['accept-encoding'];
        if (encoding) {
            if (encoding.match(/\bgzip\b/)) {
                res.setHeader('content-encoding', 'gzip');
                return zlib.createGzip();
            } else if (encoding.match(/\bdeflate\b/)) {
                res.setHeader('content-encoding', 'deflate');
                return zlib.createDeflate();
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    // 范围请求
    range(req, res, localPath, statObj) {
        const range = req.headers['range'];
        if (range) {
            let [, start, end] = range.match(/(\d*)-(\d*)/);
            start = start ? Number(start) : 0;
            end = end ? Number(end) : statObj.size - 1;
            res.statusCode = 206;
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size}`);
            fs.createReadStream(localPath, { start, end }).pipe(res);
        } else {
            return false;
        }
    }

    /**
     * 根据文件内容获得文件的 md5 编码
     * @param  {String} path 
     * @return {Promise}
     */
    md5Encoding(path) {
        return new Promise(resolve => {
            try {
                const hasher = crypto.createHash('md5');
    
                const stream = fs.createReadStream(path);
                stream.on('data', (currentData) => {
                    hasher.update(currentData);
                });
                stream.on('end', () => {
                    const code = hasher.digest('hex');
                    resolve(code);
                });
            } catch(err) {
                reject(err);
            }
        });
    }

    /**
     * 处理错误
     * @param {*} req 
     * @param {*} res 
     * @param {*} err 
     */
    sendErr(req, res, err) {
        // 使用util的inspect方法将 obj 解析，然后在转化成字符串输出到控制台
        debug(util.inspect(err).toString());
        res.statusCode = 404;
        res.end('NOT FOUND');
    }

    /**
     * 启动服务方法
     */
    start() {
        const { hostname, port } = this.config;
        const server = http.createServer(this.handleRequest.bind(this));
        server.listen(port, hostname);
        debug(`server is listening on http://${chalk.yellow(hostname)}:${chalk.yellow(port)}`);
    }
}
const server = new Server();
server.start();
