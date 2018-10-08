/* const buffer = Buffer.from([0xe7, 0x8f, 0xa0]);
console.log(buffer.toString()); */

// buffer 是一段内存，并且是引用类型
/* const buffer = Buffer.from([0,1,2]);
const newBuffer = buffer.slice(1);
console.log(newBuffer);
console.log(buffer);
buffer[0] = 1;
console.log(buffer); */

// buffer的拷贝
const target = Buffer.alloc(6);
const source = Buffer.from('四个汉字');
source.copy(target, 0, 0, 6);
console.log(target.toString());
