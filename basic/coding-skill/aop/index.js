Function.prototype.before = function(beforeFn) {
  return (...args) => {
    beforeFn();
    this(args); // 因为是箭头函数，这里的this指向会查找其上级作用域，也就是Function的实例，下面的 say
  }
}

const say = (...args) => {
  console.log('说话', ...args);
}

const newSay = say.before(() => {
  console.log('您好');
})

newSay('a', 'b');

// 这里的思想可以叫“装饰者”，也是设计模式中的“面向切面”编程，AOP

// 在react中有个事务的概念

