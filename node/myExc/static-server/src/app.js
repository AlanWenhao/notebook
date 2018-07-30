const http = require('http');
const url = require('url');
const path = require('path');
const util = require('util');
const fs = require('fs');
const crypto = require('crypto');
const zlib = require('zlib');
const mime = require('mime'); // 内容类型
const debug = require('debug')('*'); // 根据环境变量打印输出
const chalk = require('chalk'); // 粉笔
const swig = require('swig');
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
    async sendFile(req, res, localPath, stat) {
        // 判断文件是否已经缓存，设置状态码
        // this.needCache(req, res, localPath, stat);
        if (await this.needCache(req, res, localPath, stat)) {
            res.statusCode = 304;
            res.end();
            return;
        }

        res.setHeader('Content-type', mime.getType(localPath) + ';charset=utf-8');
        const zip = this.compress(req, res, localPath, statObj);
        fs.createReadStream(localPath).pipe(res);
    }

    /**
     * 
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

    async needCache(req, res, localPath, stat) {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString());
        const etag = await this.md5Encoding(localPath);
        const lastModified = stat.ctime.toGMTString();

        res.setHeader('Etag', etag);
        res.setHeader('Last-Modified', lastModified);

        const ifNoneMatch = req.headers['if-none-match'];
        const ifModifiedSince = req.headers['if-modified-since'];
        if (lastModified !== ifModifiedSince) return false;
        if (etag !== ifNoneMatch) return false;
        return true;
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
