# decorator 装饰器与装饰者模式

## 概念

参考 [阮一峰](http://es6.ruanyifeng.com/#docs/decorator)

装饰模式和适配器模式都是包装模式（Wrapper Pattern），他们都是通过封装其他对象达到设计的目的，但是他们的形态有很大的区别。
- `适配器模式`我们使用的模式比较多，比如连接不同数据库达的情况，你需要包装现有的模块接口，从而使之适配数据库，好比手机适配插座。
- `装饰器模式`不一样，仅仅包装现有的模块，使之更加华丽，并不会影响原有接口的功能，比如给手机增加手机壳，但不影响手机现有的通话功能。

简单来说，JS的装饰器可以用来装饰三种类型的对象：`类的属性和方法`、`访问器`、`类本身`。

## 应用场景
- AOP编程
    - 日志系统
    - 辅助功能
    - 安全检查
    - 缓存
    - 调试
    - 持久化

## ES7的decorator
ES7 的 decorator 概念是从 Python 借来的，在 Python 里，decorator 实际上是一个 wrapper，它作用于一个目标函数，对这个目标函数做一些额外的操作，然后返回一个新的函数。

### demo1 创建Tony Stark
```js
class Man {
    constructor(def = 2, atk = 3, hp = 3) {
        this.init(def, atk, hp);
    }

    init(def, atk, hp) {
        this.def = def;
        this.atk = atk;
        this.hp = hp;
    }

    toString() {
        return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
}

var tony = new Man();
console.log(`当前状态 ===> ${tony});
```

### 创建 decorateArmour 方法，加强 Tony

```js
function decorateArmour(target, key, descriptor) {
    const method = descriptor.value;
    let moreDef = 100;
    let ret;
    descriptor.value = (...args) => {
        args[0] += moreDef;
        ret = method.apply(target, args);
        return ret;
    }
    return descriptor;
}

class Man {
    constructor(def = 2, atk = 3, hp = 3) {
        this.init(def, atk, hp);
    }

    @decorateArmour
    init(def, atk, hp) {
        this.def = def;
        this.atk = atk;
        this.hp = hp;
    }

    toString() {
        return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
}
var tony = new Man();
console.log(`当前状态 ===> ${tony});
```

> - 为什么 `decorateArmour` 的参数是三个，必须是三个吗？
> - `decorateArmour` 方法为什么返回的是 `descriptor` ?  

解答：
- Decorators 本质是利用了 ES5 的 `Object.defineProperty` 属性，这三个参数其实是由 `Object.defineProperty` 决定的，因此不能更改
- [不明白](http://taobaofed.org/blog/2015/11/16/es7-decorator/)

### demo2 装饰器叠加，增加 atk
```js
function decorateArmour(target, key, descriptor) {
    const method = descriptor.value;
    let moreDef = 100;
    let ret;
    descriptor.value = (...args) => {
        args[0] += moreDef;
        ret = method.apply(target, args);
        return ret;
    }
    return descriptor;
}
function decorateLight(target, key, descriptor) {
    const method = descriptor.value;
    let moreAtk = 50;
    let ret;
    descriptor.value = (...args) => {
        args[1] += moreAtk;
        ret = method.apply(target, args);
        return ret;
    }
}

class Man {
    constructor(def = 2, atk = 3, hp = 3) {
        this.init(def, atk, hp);
    }

    @decorateLight
    @decorateArmour
    init(def, atk, hp) {
        this.def = def;
        this.atk = atk;
        this.hp = hp;
    }

    toString() {
        return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
    }
}
var tony = new Man();
console.log(`当前状态 ===> ${tony});
```

## demo3 对类的装饰：增加飞行能力

**上述两种装饰模式都是纯粹的装饰模式，他不增加原有类的接口，但下面的demo是给普通人增加飞行能力，相当于给类新增一个方法，属于半透明装饰模式**

```js
function addFly() {
    return function(target) {
        target.canFly = canFly;
        let extra = canFly ? '(技能加成：飞行能力)' : '';
        let method = target.prototype.toString;
        target.prototype.toString = (...args) => {
            return method.apply(target.prototype, args) + extra;
        }
        return target;
    }
}

@addFly(true)
class Man {
    ...
}
```

**作用在方法上的 decorator 接收的第一个参数（target ）是类的 prototype；如果把一个 decorator 作用到类上，则它的第一个参数 target 是 类本身。**