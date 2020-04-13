interface IAnyObj {
    [prop: string]: any
}

function mixin<T extends IAnyObj, U extends IAnyObj>(a: T, b: U): T & U {
    const result = <T & U>{};
    for(let key in a) {
        (<T>result)[key] = a[key];
    }
    for(let key in b) {
        (<U>result)[key] = b[key];
    }

    return result;
}
