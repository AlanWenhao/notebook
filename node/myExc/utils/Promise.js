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
        if (this.status === 'resolved') {
            onFufilled(this.value);
        }
        if (this.status === 'rejected') {
            onRejected(this.reason);
        }
        // 如果 new 的 promise 内部是异步调用resolve，那么then方法不会等待异步，会直接判断status既不是resolve也不是 reject，
        // then方法直接执行过去了，既不会调用 onFufilled，也不会调用 onRejected，所以将之后执行的函数放在constructor的两个数组队列中中。
        // 为什么是两个队列呢？因为then是链式调用，不限于执行一次，而成功与失败在promise中都是可传递的，所以放在两个队列中
        if (this.status === 'pending') {
            this.onResolvedCallbacks.push(() => {
                // 因为这里需要传递参数，所以外面又包了一层函数，不然函数直接执行了，另外一个好处是，
                // 这里push进来一个带函数外壳的onFufilled，在执行外壳的时候，还可以写一些逻辑
                /* 这里可以写一些逻辑 */
                onFufilled(this.value);
            });
            this.onRejectedCallbacks.push(() => { // 存放失败的回调
                onRejected(this.value);
            });
        }
    }
}

module.exports = Promise;
