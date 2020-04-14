function method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(target);
    console.log("prop " + propertyKey);
    console.log('descriptor是：', descriptor);
    console.log("desc " + JSON.stringify(descriptor) + "\n\n");
    descriptor.writable = false;
};

class Person{
    name: string;
    constructor() {
        this.name = 'xiaomuzhu';
    }

    @method
    say(){
        return 'instance method';
    }

    @method
    static run(){
        return 'static method';
    }
}

const xmz = new Person();

// 修改实例方法say
xmz.say = function() {
    return 'edit'
}

// 打印结果,检查是否成功修改实例方法
console.log(xmz.say());