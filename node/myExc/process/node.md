[参考链接](https://www.jianshu.com/p/4748662974f0)

这个process对象是EventEmitter的实例。它是一个**全局变量**，在当前的Node.js进程中提供有关信息  
所以可以像EventEmitter的其他实例一样用`on`方法来订阅
可以监听的事件有
```js
process.on('uncaughtException', () => {})
所以使用它可以拦截一些uncaught错误
```

### uncaughtException
在过去几年中，我们见到很多对于这个事件的错误的运用。当使用这个process模块中的uncaughtException事件时，有以下几点十分重要的建议需要注意

- 如果`uncaughtException`事件发生了，这表明你的应用正处在一个未定义的状态中
- 十分不建议借助`uncaughtException`事件尝试恢复应用正常运行，这种操作是不安全
- 这个事件的处理器应该只用来进行已分配资源的同步清理操作(不是很懂)
- 如果处理这个事件的函数内有异常抛出且未被捕获的话，应用会立刻退出
- 你应该使用外部工具来监控你的进程并且在必要时重启它（比如当它崩溃的时候）
- **正确使用 'uncaughtException' 事件的方式，是用它在进程结束前执行一些已分配资源（比如文件描述符，句柄等等）的同步清理操作**。
- **想让一个已经崩溃的应用正常运行，更可靠的方式应该是启动另外一个进程来监测/探测应用是否出错， 无论 uncaughtException 事件是否被触发，如果监测到应用出错，则恢复或重启应用**。


### unhandledRejection

如下代码，如果读取不到文件，node版本4以下会直接退出，留下一脸懵逼的你，现在高版本的node会有报错提示

```js
const fs = require('fs');
const { promisify } = require('util');
const ReadFile = promisify(fs.readFile);
ReadFile('./node.mddd').then(() => console.log('success!!!'));
```
报错如下,这个报错告诉我们promise中有个错误没有捕获
```
(node:7204) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: ENOENT: no such file or directory, open './node.js'
(node:7204) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the No
de.js process with a non-zero exit code.
```

所以之后的代码最好加上错误捕获
```js
const fs = require('fs');
const { promisify } = require('util');
const ReadFile = promisify(fs.readFile);
ReadFile('./node.mddd')
    .then(() => console.log('success!!!'))
    .catch((err) => console.log(err));
```

> Promise rejections未处理的问题其实跟uncaughtException一样 - **你的 Node.js 进程会处于一个未定义的状态，更糟糕的是，这可能会引起文件描述符未关闭（ file descriptor failure ）以及内存泄漏**。在这种情况下，你最好还是重新启动Node.js进程。  

推荐阅读[编写安全的promise](https://github.com/mcollina/make-promises-safe)

##### 综上所述，你应该给unhandledRejection事件添加监听器并且使用 `process.exit(1)` 来退出进程

### node.js 信号事件

### Process模块公开的方法和值

`process.pwd()`
返回当前工作的目录
如果你想改变它，可以调用 `process.chdir(path)` 这个方法

`process.env`
该**属性**返回一个包含用户环境的对象

`process.exit([code])`
'exit' 事件监听器的回调函数，只允许包含同步操作。
这个方法告诉Node进程用一个推迟的状态码来同步的终止进程，但是可能会有一些后果：
- 强制进程尽快终止
    - 即使有些异步操作仍在进行
    - 因为`STDOUT`(使用者输出)和`STDERR`(错误信息输出)的输出的异步的，所以有些日志信息可能会丢失
- 在大多数情况下，不推荐使用`process.exit()` - 你可以让代码运行完毕自动退出作为替代

比如下面的例子中，定时器中的代码永远不会执行
```js
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('该函数不会被执行');
  }, 0);
});
```

`process.kill(pid, [signal])`
你可以用这个方法来发送各种 POSIX 信号给各种进程。你不仅仅可以像它名字写的那样用来杀死进程。这个命令就像一个信号发送器（包括杀死系统调用）

`process.argv`
