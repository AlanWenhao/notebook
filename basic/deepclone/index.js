/**
 * 浅拷贝
 * @param {Object} obj 克隆的对象
 */
function cloneShdow(obj) {
    var target = {};
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            target[key] = obj[key];
        }
    }
    return target;
}

/**
 * 深拷贝（对null的处理有问题）
 * @param {Object} obj 深拷贝的对象
 */
function deepClone(obj) {
    var target = {};
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'object') {
                target[key] = deepClone(obj[key]);
            } else {
                target[key] = obj[key];
            }
        }
    }
    return target;
}

/**
 * 是否是对象，不区分 array 与 object
 * @param {Any} value 要判断的值
 */
function isObject(value) {
    return typeof value === 'object' && value !== 'null';
}

/**
 * 深拷贝，兼容数组与对象，对null进行处理
 * @param {Any} source 
 */
function deepClone2(source) {
    if (!isObject(source)) return source;

    var target = Array.isArray(source) ? [] : {};
    for (key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = deepClone2(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}

/**
 * 深拷贝，解决循环引用的问题，如果两个值引用，同一个值，这个引用关系在拷贝后也不会被破坏
 * @param {Any} source 
 * @param {Map} hash 
 */
function deepClone3(source, hash = new WeakMap()) {
    if (!isObject(source)) return source;
    if (hash.has(source)) return hash.get(source);

    var target = Array.isArray(source) ? [] : {};
    hash.set(source, target);
    for (key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = deepClone3(source[key], hash);
            } else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
