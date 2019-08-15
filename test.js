class Father {
    constructor() {
        this.name = 'father';
    }
    sayFather() {
        console.log('father');
    }
}

class Son extends Father {
    constructor() {}
}

const father = new Father();
const son = new Son();

console.log(Father);
console.log(Son);
console.log(father);
console.log(son);
