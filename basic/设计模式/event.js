class EventEmitter {
    constructor() {
        this._events = {};
    }
    on(eventName, callback) {
        if (!this._events) this._events = {}; // 因为调用 on 方法的是实例，没有父类的属性 _events
        if (eventName !== 'newListener') {
            this._events['newListener'] ? this._events['newListener'].forEach(fn => fn(eventName)) : void 0;
        }
        if (this._events[eventName]) {
            this._events[eventName].push(callback);
        } else {
            this._events[eventName] = [callback];
        }
    }
    once(eventName, callback) {
        function one() {
            callback(...arguments);
            this.off(eventName.one);
        }
        one.l = callback;
        this.on(eventName, one);
    }
    off(eventName, callback) {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(fn => fn !== callback && fn.l !== callback);
        }
    }
    emit(eventName, ...args) {
        if (this._events[eventName]) {
            this._events[eventName].forEach((fn) => {
                fn.call(this, ...args);
            });
        }
    }
    
}

module.exports = EventEmitter;
