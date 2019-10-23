let pubSub = {
  subs: [],
  subscribe(key, fn) { //订阅
    if (!this.subs[key]) {
      this.subs[key] = [];
    }
    this.subs[key].push(fn);
  },
  publish(...arg) {//发布
    let args = arg;
    let key = args.shift();
    let fns = this.subs[key];
 
    if (!fns || fns.length <= 0) return;
 
    for (let i = 0, len = fns.length; i < len; i++) {
      fns[i](args);
    }
  },
  unSubscribe(key) {
    delete this.subs[key]
  }
}
 
//测试
pubSub.subscribe('name', name => {
  console.log(`your name is ${name}`);
})
pubSub.subscribe('gender', gender => {
  console.log(`your name is ${gender}`);
})
pubSub.publish('name', 'leaf333');  // your name is leaf333
pubSub.publish('gender', '18');  // your gender is 18