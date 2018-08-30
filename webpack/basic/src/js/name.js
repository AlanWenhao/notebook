console.log('I am Alan');
class Person {
    constructor() {
        this.name = 'Ben';
    }

    sayName() {
        console.log(`I said ${this.name} already`);
    }
}
const person = new Person();
person.sayName();

const arr = [1, 2, 3, 4, 5];
console.log(...arr);
