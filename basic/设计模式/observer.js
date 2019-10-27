// 观察者模式是基于发布订阅模式的
// 此模式下，观察者跟发布者是有关系的，并不像发布订阅是通过中介
class Star {
    constructor(name) {
        this.name = name;
        this.state = '';
        this.observers = [];
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
        this.notifyAllObservers();
    }
    attach(observer) {
        this.observers.push(observer);
    }
    notifyAllObservers() {
        this.observers.forEach(observer => observer.update());
    }
}
class Fan {
    constructor(name, subject) {
        this.name = name;
        this.subject = subject;
        this.subject.attach(this);
    }
    update() {
        console.log(`${this.subject.name}有新的状态-${this.subject.getState()},${this.name}正在更新`);
    }
}
let star = new Star('赵丽颖');
let fan1 = new Fan('姜老师', star);
star.setState('结婚');
