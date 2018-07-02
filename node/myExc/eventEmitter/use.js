const myEventEmitter = require('./EventEmiter');

const event = new myEventEmitter();
function run(home, company) {
    console.log(`跑到${home}在到${company}`);
}
event.on('run', run);

event.emit('run', '家', '公司');
