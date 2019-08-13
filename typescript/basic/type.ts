interface LengthWise {
    length: number
}

function logger<T extends LengthWise>(val: T) {
    return val.length;
}
console.log(logger('12345'));
