- 基本操作
    - 读文件
    - 写文件
    - 自己实现copy(读加写)
    - appendFile (似乎与writeFile flag 设置 'a' 一样)
    - fs.open(path, flags[, mode], callback) (理解文件描述符)
    - fs.read(fd, buffer, offset, length, position, callback)


## TIPS
- `mode` 设置 0o666 或者10进制的 `438` 都行

- fs模块常用方法 
    - [segmentdefault](https://segmentfault.com/a/1190000011343017)
    - [菜鸟教程](http://www.runoob.com/nodejs/nodejs-fs.html)

- 文件描述符从 3 开始

- mkdir注意点
    - 文件夹已经存在继续创建则会报错
    - 创建目录的时候必须要求父目录已经存在，可以利用 `fs.access` 方法判断
    - 文件会被创建到当前目录下，不能写作 path 不能写作`/path`，会报错

- path.sep 不同系统下的分隔符
