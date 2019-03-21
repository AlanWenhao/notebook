# 浏览器渲染原理与基本架构

## 预热问题
- 操作系统中的应用是怎么运行的
- 浏览器究竟是什么，是底层还是应用
- webkit和浏览器的关系
- 浏览器是怎么呈现网页的
- 经典问题，输入网址到浏览器页面呈现完毕，发生了什么

## 浏览器历史
1. 1991年，第一台浏览器`worldwideweb`万维网的出现，后改名为`Nexus`，功能简单
1. 1993年， `Mosaic` 出现，可以显示图片，使用 `useragent`区分客户端，决定是否发送图片，节省带宽
1. 1994年，`Mozzila` 浏览器
1. 1995年，IE为抢占市场，退出IE浏览器，`useragent`为 `Mozilla/1.22` (其实就是伪造)
1. 1998年，`Netscape`失利，成立`Mozilla`组织
1. 2003年，网景公司解散，`Mozilla`基金会成立，推进了后来的`Firefox`
1. `Mozilla` 开发了 `Geoko` 变成 `FireFox`，useragent 为 `Mozilla/5.0`
1. 众多浏览器厂商出现，useragent上都带有 `Mozilla/5.0`
1. chrome 与 Safari 出现，占有了大批的市场份额

## 用户代理`UserAgent`
- 查看
    - navigator.useragent
- 作用
    - 判断浏览器的类型采用兼容方案
    - 判断是否为移动端
    - 标识H5容器，方便调用H5容器特定接口，例如`微信开发`，`客户端hibird`
- 注意
    - useragent伪装成本很低，不要过分依赖

## 内核的概念

### 系统层面
对于操作系统而言，内核是操作系统的核心。**是第一层基于硬件的软件扩种**。提供最核心最基础的服务。`应用程序通过内核进行系统调用，进而操作计算机的硬件，内核是可以直接管理硬件的`。内核代码简洁高效，基本上没有什么bug。由于是最底层的服务，一点基本的错误也会造成整个系统的崩溃，好处也是可见的。基于一个稳定的内核，开发者可以构建不同场景的操作系统和应用软件。例如，给予linux的centos与ubuntu

### 浏览器层面
对于浏览器来说，同样存在浏览器的内核，与操作系统的内核相似，浏览器内核提供API给开发者使用，同时提供最核心的功能渲染网页、调用操作系统所提供的服务。

![顺序](./img/process.png)

最后
对于浏览器厂商来说：高效实用浏览器内核是核心问题
对于开发者来说：理解浏览器内核机制，有利于开发高效的应用

## 浏览器内核

### 定义
浏览器中`负责将表示页面的字符转变成可视图像`的模块

![出发目的](./img/goal.png)

### 内核解析字符
使用node的`tcp`模块向IP发起请求，来观察服务器最初给到的字符究竟是什么
```js
const net = require('net');
const fs = require('fs');
const path = require('path');

const destPort = 80;
const destHost = '120.24.156.16';

let allBuffer = null;

const client = net.createConnection(destPort, destHost, function() {
    console.log('connect to server');
    client.write('GET / HTTP/1.0\r\nAccept: text/html\r\nHost: zakwu.me\r\nCache-Control: no-cache/r/nUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36\r\n\r\n');
});

client.on('data', function(data) {
    console.log('recieve data');
    if (!allBuffer) {
        allBuffer = data;
    } else {
        allBuffer = Buffer.concat([allBuffer, data]);
    }
});

client.on('error', function(err) {
    console.log(err);
});

client.on('end', function() {
    console.log('connect end');
    if (allBuffer === null) return console.log('no data recieved~~~');
    const htmlContent = allBuffer.toString();
    const ws = fs.createWriteStream(path.join(__dirname, 'output.html'));
    ws.write(htmlContent);
});
```

代码分析
- 所有的网络开发模式下，都是基于socket的一个管道来做的，可以抽象成链接本地到远端的管道
- client.write方法即想远端写入的方法

### 响应组成
```bash
# 起始行
HTTP/1.1 200 OK
# 服务器
Server: nginx/1.1.19
# 服务器发送内容的时间
Date: Thu, 21 Mar 2019 05:45:24 GMT
# 实体类型
Content-Type: text/html; charset=utf-8
# 实体类型
Content-Length: 78659
# 链接状态
Connection: close
# express头
X-Powered-By: Express
# 缓存，public表示任何时候都缓存，max-age表示缓存时间
Cache-Control: public, max-age=0
# 缓存令牌
ETag: W/"7bjxThJ+0QyGqytHIZCLhg=="
# 决定了对于未来的一个请求头，应该用一个缓存的回复(response)还是向源服务器请求一个新的回复（这个不太熟，没用过）
Vary: Accept-Encoding

<!doctype html>
<html>
    <head>
    ...
    </head>
    <body>
    ...
    </body>
</html>
```

思考几个问题：
- 以上这段代码的逻辑
- 返回的字符串如何解析
- 想让返回的字符串呈现为图像，怎么做

## 浏览器渲染要做的工作
![browser](./img/webkit-process.png)

上图表示了渲染引擎一般的渲染过程，虚线表示依赖了外部模块（不属于渲染引擎）

重要组件：
- HTML解释器：解释`HTML`文本的解释器，HTML => DOM
- CSS解释器：遇到级联样式时，调用`级联样式表解释器`，为DOM对象计算出样式信息
- JavaScript引擎：遇到`JS`代码时候，需要使用JavaScript解释器，使得JS代码有调用DOM接口和CSSOM接口的能力
- 布局：结合CSS，计算出每个DOM对象的大小与位置信息
- 绘图：经过布局计算DOM节点绘制图像

综上可以知道，`渲染引擎`其实就是四块：

![render engine](./img/render-engine.png)

### 重绘与回流

> 浏览器在将DOM与CSSOM解析完毕之后将会进行“绘制图像”的过程，此时会发生`layout`与`paint`在此过程中，针对特定的情况，还会发生`reflow`与`repaint`  

#### 图层

一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。`不同的图层渲染互不影响`，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。`但也不能生成过多的图层，会引起反作用`。

通过以下几个常用属性可以生成新图层
- 3D 变换：`translate3d`、`translateZ`
- `will-change`
- `video`、`iframe` 标签
- 通过动画实现的 `opacity` 动画转换
- `position: fixed`

#### 重绘与回流
重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大
- 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就叫称为重绘
- 回流是布局或者几何属性需要改变就称为回流。

> 回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。  

所以以下几个动作会触发重绘：
- dom树结构变化，删除或者添加某个node
- 元素几何属性变化，包括 margin、padding、height、width、border等
- 页面渲染初始化
- 浏览器窗口发生变化 `resize` 事件发生时

避免过多的重绘与回流，提高浏览器的渲染效果
- 将改变样式的操作集合在一次完事，直接改变`className`或者`cssText`，而不是频繁多次更改样式
- 让要操作的元素进行`离线`处理，处理完事以后再一起更新
    - 使用`DocumentFragment`进行缓存操作（注意查看兼容性）
    - 将元素`display: none;`操作元素，再`diaplay: block;``
- 动画操作避免直接操作元素的`top·、·left·...等属性
- 使用`css3`动画
- 开启GPU加速渲染（特定属性，比如 `transform: translate3d(10, 0, 0)`）
- 不要使用`table`布局，因为小小的改动将会引起大面积的重新布局
- 动画实现速度的优化`requestAnimationFrame`
-使用`visibility`替换`display: none`，因为前者只会引起重绘，后者会引发回流（改变了布局）

其实重绘与回流与浏览器的EventLoop有密不可分的关系，了解更多，可以参考 [event-loop-processing-model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

### 进一步介绍渲染

- 在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证`层级扁平`，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。

- 当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件。并且 CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂停构建 DOM。这也是最基本的优化，要求将JS写在<body>底部。但是结合日常的开发经验，我们发现，其实即使将`<script>`标签写在了`<header>`头中，也不会明显感觉渲染变慢，这是因为现代浏览器会又一次预加载，去读取css与js文件


## 浏览器内核架构

webkit架构图，虚线表示非共享（不同浏览器中实现是不一样的），实现表示共享（不同浏览器一致）
![webkit 架构图](./img/architecture.jpg)

### Chromium架构

> Chrome内核“比较激进”的版本，而chrome使用的架构则是相对稳定成熟的，同基于webkit内核构建

### 现代浏览器的工作
- 资源管理
- 多页面管理：多个标签的管理
- 插件和扩展：如 flash、油猴 [传送门](https://sspai.com/post/40485)、chrome扩展
- 账户和同步
- 安全机制
- 多系统支持

### 进程和线程
- 进程：对CPU、主存、IO设备的抽象，操作系统对一个正在运行的程序的抽象
- 线程：组成进程的执行单元
- 进程通信IPC：进程间传输（交换）数据，比如 HTML5 WebWorker 的postMessage、sendMessage等

### Chromium多进程架构
![chromium](./img/chromium.png)

主要进程介绍：
- Browser进程：主进程，一般有且只有一个，负责浏览器界面，页面管理等
- Render进程：渲染进程
- NPAPI插件进程
- GPU进程：当GPU硬件加速打开时才会创建

多进程架构的目的所在：
1. 职责分离，故障范围小。
1. 隔离性
1. 性能


## 如何提高加载速度
- 合并请求
- 雪碧图
- from cache: from memery cache、from disk cache、localstrorage
- tcp网络调优、HTTP/2、静态资源请求头（结合业务）
- 硬件：加大带宽、使用CND（对象存储）、pwa
- 资源大小：Gzip、webp、image压缩、减小cookie体积（店长的反例）
- 预加载：dns预读取、多个CND域名、异步读取JS（script 的defer、async）

## 总结
可以看出上面的众多知识点之间存在的密不可分的联系
- 比如从网路资源的线程可以扩展到请求头，请求头又可以联想到缓存机制、对静态资源的加载优化等等
- 比如DOM与CSS的渲染可以扩展出重绘、回流，进而扩展到该怎么正确编写动画、怎么使用JS操作DOM而不带来渲染上的巨大代价等等

了解浏览器内核、即渲染机制对于前端工程师而言是非常重要的，我们不需要深入了解其架构以及内部实现，但是必须深入理解其机制，这样在开发过程中能够在心中有一个衡量，进而开发出更优质的前端应用。

<div style="height: 500px"></div>

![thanks](./img/thanks.png)
