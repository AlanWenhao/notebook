// function decorateArmour(target, key, descriptor) {
//     const method = descriptor.value;
//     let moreDef = 100;
//     let ret;
//     descriptor.value = (...args) => {
//         args[0] += moreDef;
//         ret = method.apply(target, args);
//         return ret;
//     }
//     return descriptor;
// }
// function decorateLight(target, key, descriptor) {
//     const method = descriptor.value;
//     let moreAtk = 50;
//     let ret;
//     descriptor.value = (...args) => {
//         args[1] += moreAtk;
//         ret = method.apply(target, args);
//         return ret;
//     }
// }
// function addFly(canFly) {
//     return function(target) {
//         target.canFly = canFly;
//         let extra = canFly ? '(技能加成：飞行能力)' : '';
//         let method = target.prototype.toString;
//         target.prototype.toString = (...args) => {
//             return method.apply(target.prototype, args) + extra;
//         }
//         return target;
//     }
// }

// @addFly(true)
// class Man {
//     constructor(def = 2, atk = 3, hp = 3) {
//         this.init(def, atk, hp);
//     }

//     @decorateLight
//     @decorateArmour
//     init(def, atk, hp) {
//         this.def = def;
//         this.atk = atk;
//         this.hp = hp;
//     }

//     toString() {
//         return `防御力:${this.def},攻击力:${this.atk},血量:${this.hp}`;
//     }
// }
// var tony = new Man();
// console.log(`当前状态 ===> ${tony}`);


@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

console.log(MyTestableClass.isTestable);

MyTestableClass.isTestable // true
