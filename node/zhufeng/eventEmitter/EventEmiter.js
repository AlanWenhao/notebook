class EventEmitter {
    constructor() {
        this._events = Object.create(null);
    }

    on(eventName, callback) {
        // if (!this._events) this._events = Object.create(null);
        if (this._events[eventName]) {
            this._events[eventName].push(callback);
        } else {
            this._events[eventName] = [callback];
        }
    }

    emit(eventName, ...args) {
        if (this._events[eventName]) {
            // 这里将callback的执行上下文固定为当前实例，但是不知道为什么要这么做
            this._events[eventName].forEach(callback => callback.call(this, ...args));
        }
    }

    removeListener(eventName, callback) {
        if (this._events[eventName]) {
            this._events[eventName] = this._events[eventName].filter(fn => fn !== callback)
        }
    }

}

const test = new EventEmitter();

module.exports = EventEmitter;
