- 基本操作
    - 读文件
    - 写文件
    - 自己实现copy(读加写)
    - appendFile (似乎与writeFile flag 设置 'a' 一样)
    - fs.open(path, flags[, mode], callback) (理解文件描述符)
    - fs.read(fd, buffer, offset, length, position, callback)


## TIPS
`mode` 设置 0o666 或者10进制的 `438` 都行

文件描述符从 3 开始
