function fn1() {
    console.log(this, arguments);
}

fn1.call('Hello', 1);
