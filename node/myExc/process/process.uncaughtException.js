
console.log(process);

process.on('uncaughtException', () => {
    console.log('这是一个异常错误');
});
