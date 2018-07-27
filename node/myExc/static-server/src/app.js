const http = require('http');
const url = require('url');
const path = require('path');
const util = require('util');
const fs = require('fs');
const zlib = require('zlib');
const mime = require('mime'); // 内容类型
const debug = require('debug')('*'); // 根据环境变量打印输出
const chalk = require('chalk'); // 粉笔
const ejs = require('ejs'); // underscore handlebar ejs jade....
// 1、指定主机名、端口号、静态文件存放目录
const CONFIG = require('./config');

const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);

class Server {
    constructor() {
        this.config = CONFIG;
    }
    /**
     * 
     * @param {*} req
     * @param {*} res
     */
    async handleRequest(req, res) {
        const { pathname } = url.parse(req.url, true);
        const localPath = path.join(this.config.dir, pathname);
        console.log('-----', localPath);

        if (pathname === '/favicon.ico') { // 如果是'/favicon.ico'不处理当前请求
            res.end();
            return;
        }
        
        try { // 判断当前目录是否存在,如果是路径，显示路径,如果是文件，显示文件
            const statObj = await stat(localPath);
            if (statObj.isDirectory()) { // 判断是否是文件夹
                const dirs = await readdir(localPath);
                const dirsObj = dirs.map(dir => {
                    return {
                        name: dir,
                        path: path.join(this.config.dir, dir),
                    }
                });
                console.log(dirsObj);
            } else { // 不是文件夹就是文件
                this.sendFile(req, res, localPath, stat);
            }

            // res.end(util.inspect(statObj.__proto__).toString());
        } catch (err) {
            this.sendErr(req, res, err);
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} localPath 
     * @param {*} stat 
     */
    sendFile(req, res, localPath, stat) {
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

    /**
     * 
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
