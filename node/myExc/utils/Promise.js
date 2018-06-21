/**
 * 自定义Promise
 * 玩成之后需要经过 promisesaplus 测试
 */
class Promise {
    constructor(excutor) {
        this.status = 'pending'; // 默认状态是等待
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        
        // 这里函数的 this 都是实例，因为箭头函数
        const resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        const reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try { // 执行时可能会异常，异常后调用reject
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFufilled, onRejected) {
        // 这里是因为，then()不传值，不论成功还是失败，值都会自动穿透到下一个then，所以判断一下，如果onFufilled或onRejected有传值并且是函数那就执行，如果不是函数或者没有写，那就穿透
        onFufilled = typeof onFufilled === 'function' ? onFufilled : y => y;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }; // 这里如果不throw的话， y => y,接下来一个then就跑到成功了o(╯□╰)o

        let promise2;
        if (this.status === 'resolved') {
            promise2 = new Promise((resolve, reject ) => {
                setTimeout(() => {
                    try {
                        let x = onFufilled(this.value); // 看 x 是不是 promise，是的话需要取成功或失败的结果作为返回，如果不是那就直接返回这个值
                        resolvePromise(promise2, x, resolve, reject); // 可以解析 promise2 与 x 的关系，
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            })
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
            promise2 = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try { // 这里的 try catch 是想要捕获 Promise 内部异步代码的错误
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            });
        }
        // 如果 new 的 promise 内部是异步调用resolve，那么then方法不会等待异步，会直接判断status既不是resolve也不是 reject，
        // then方法直接执行过去了，既不会调用 onFufilled，也不会调用 onRejected，所以将之后执行的函数放在constructor的两个数组队列中中。
        // 为什么是两个队列呢？因为then是链式调用，不限于执行一次，而成功与失败在promise中都是可传递的，所以放在两个队列中
        if (this.status === 'pending') {
            promise2 = new Promise((resolve, reject) => {
                // 因为这里需要传递参数，所以外面又包了一层函数，不然函数直接执行了，另外一个好处是，
                // 接下来两次push进去一个带函数外壳的onFufilled，在执行外壳的时候，还可以写一些逻辑
                this.onResolvedCallbacks.push(() => {
                    try {
                        let x = onFufilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
                this.onRejectedCallbacks.push(() => { // 存放失败的回调
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            });
        }
        return promise2;
    }
}

// 判断 x 是不是 promise
// 1、首先避免 Promise2 与 x 指向的是同一个对象，因为promise是一个链条，下面的promise依赖于上面promise的状态，
// 如果上下是同一个promise的话，将会发生自己等待自己状态的情况，代码会卡在这里不执行
// 2、如果 x 是一个 promise 
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'));
    }
    if (x !== null && (typeof x === 'object' || x === 'function')) { // x 不是null，并且是对象或者函数
        let called = false; // 防止成功后再调失败
        try { // 原因1(防止取then时候发生错误)
            let then = x.then; // 取 x 的then
            if (typeof then === 'function') { // 判断如果 then 是函数，那么 x 就是一个 promise,这时候 x 接受两个参数，resolve与reject
                // call 接受两个参数，第一个是 this，后面的是成功的回调与失败的回调，注意， PromiseA+ 规范规定，x.then 的 this 同样指向 x
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject); // 原因2
                }, r => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else { // 如果 x 就是一个普通值，那么就直接返回 x 给下一个then
        resolve(x);
    }
}

module.exports = Promise;

// 原因1：
/* x.then一般情况下娶不到的话会返回 undefined，但是resolvePromise这个函数本质也是去为了兼容各种自定义的promise，让大家的promise可以通用，所以，这里可能会用一下写法，所以这里额try，catch还是有必要的
Object.defineProperty('then', {
    get() {
        throw new Error();
    },
    set() {}
}); */


// 原因2，试想以下的代码
// 原因1是在判断 then 方法 return 的是不是 promise， 而原因2是在判断return出的如果是promise，那么这个promise一开始同步代码中的resolve传递的是promise还是普通值
// 一般情况下，log 出的 data 是 p resolve 传递的普通值，但是 p 如果 resolve 传递的是一个 promise 呢？o(╯□╰)o
// 最后log出来的 data 应给是 p resolve 传递的 promise 中的 resolve，所以又要递归了！！！o(╯□╰)o
/* const promise = new Promise((resolve, reject) => {
    resolve(123);
});
const p = promise.then((data) => {
    resolve(new Promise((resolve, reject) => { resolve(456) }));
});
p.then((data) => {
    console.log(data);
}); */
