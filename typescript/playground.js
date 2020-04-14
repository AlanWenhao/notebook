var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function method(target, propertyKey, descriptor) {
    console.log(target);
    console.log("prop " + propertyKey);
    console.log('descriptor是：', descriptor);
    console.log("desc " + JSON.stringify(descriptor) + "\n\n");
    descriptor.writable = false;
}
;
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'xiaomuzhu';
    }
    Person.prototype.say = function () {
        return 'instance method';
    };
    Person.run = function () {
        return 'static method';
    };
    __decorate([
        method
    ], Person.prototype, "say", null);
    __decorate([
        method
    ], Person, "run", null);
    return Person;
}());
var xmz = new Person();
// 修改实例方法say
xmz.say = function () {
    return 'edit';
};
// 打印结果,检查是否成功修改实例方法
console.log(xmz.say());
