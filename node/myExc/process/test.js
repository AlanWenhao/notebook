console.log();

process.on('uncaughtException', () => {
    console.log('发生了一个异常错误');
});
