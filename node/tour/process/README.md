# 进程
## 总览
- 方法
    - memoryUsage()     进程的内存使用情况的对象，该对象每个属性值的单位为字节
    - nextTick()        将函数中的代码推迟到下一个微异步任务执行
    - chdir             用于修改 Node.js 应用程序中当前工作目录
    - cwd()             返回当前工作的目录，没有参数，与process.argv[1]相似但不同
    - exit()            退出当前运行 Node.js 的进程
    - kill()            向进程发送一个信号，与用户手动ctrl+c相似，参数(pid, dignal)，signal默认SIGTERM
    - uptime()          返回当前程序运行的时间
    - hrtime()          测试一个代码段的运行事件，第一个单位是秒，第二个单位是纳秒
- 属性
    - execPath          可执行文件的绝对路径
    - version           版本号
    - versions          依赖的版本号
    - platform          运行平台，win32，linux
    - stdin             标准输入可读流 ReadStream 
    - stdout            标准输出可写流 WriteStream
    - stderr            标准错误可写流 WriteStream
    - argv              返回数组 [process.execPath, 当前执行的JavaScript文件路径]
    - env               操作系统环境信息
    - pid               进程ID
    - title             窗口标题
    - arch              处理器架构 arm ia32x64
- 事件
    - exit事件                  进程退出事件
    - uncaughtException事件     应用程序抛出未被捕获的异常时候出发
    - 信号事件                  on('SIGINT', callback) 



## process.stdin 标准输入流
- 属性返回连接到 stdin (fd 0) 的流。
- 是一个 net.Socket，也就是 Duplex 流
- 除非 fd 0 指向一个文件，这种情况下他是 Readable

可用方法与事件：与可读流相似，比如 `setEncoding('utf-8)`, `on('readable', callback)`

## process.stdout 标准输出流
可用方法与事件：与可写流相似，比如 `write('some work')`

-----

## 子进程 `child_process`

一篇很好的文章
[传送门](https://github.com/forthealllight/blog/issues/24)
