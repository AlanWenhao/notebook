const EventEmitter = require('../event');
const util = require('util');

function Girl() {}
Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype);
const girl = new Girl();

const cry = (thing) => {
    console.log('cry', thing);
}
const drink = (thing) => {
    console.log('drink', thing);
}

girl.on('newListener', (type) => {
    console.log(type);
})

girl.once('失恋', cry);
girl.emit('失恋', '被甩');
girl.emit('失恋', '被甩');
