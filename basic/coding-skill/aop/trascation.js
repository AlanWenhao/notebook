// 事务 开始的时候做某件事，结束的时候再做某件事

const performance = (anyMethod, wrappers) => {
  wrappers.forEach((wrapper) => {
    wrapper.initilize()
  });
  anyMethod();
  wrappers.forEach(wrapper => {
    wrapper.close()
  });
}


performance(() => {
  console.log('业务代码');
}, [
  { // wrapper
    initilize() {
      console.log('您好');
    },
    close() {
      console.log('再见');
    }
  },
  { // wrapper1
    initilize() {
      console.log('您好1');
    },
    close() {
      console.log('再见1');
    }
  }
])
