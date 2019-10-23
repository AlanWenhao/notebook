const after = (times, fn) => {
  return () => {
    if (--times === 0) {
      fn();
    }
  }
}

const f = after(3, () => {
  console.log('最终执行');
})
f();
f();
f();
