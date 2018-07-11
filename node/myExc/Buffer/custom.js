Buffer.prototype.mycopy = function(target, targetStart, sourceStart, sourceEnd) {
    for(let i = 0; i < sourceEnd - sourceStart; i ++) {
        target[targetStart + i] = this[sourceStart + i]
    }
}

Buffer.myconcat = function(bufArr, len = bufArr.reduce((total, currentValue) => total + currentValue.length, 0)) {
    let newBuffer = Buffer.alloc(len);
    let index = 0;
    bufArr.forEach(buf => {
        buf.mycopy(newBuffer, index, 0, buf.length);
        index += buf.length;
    });
    return newBuffer;
}

Buffer.prototype.split = function (sep) {
    let offset = 0;
    let len = Buffer.from(sep).length;
    let arr = [];
    let start = 0;
    while (-1 != (offset = (this.indexOf(sep, start)))) {
      arr.push(this.slice(start, offset));
      start = offset + len;
    };
    arr.push(this.slice(start));
    return arr;
}
