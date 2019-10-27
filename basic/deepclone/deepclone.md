# 深拷贝

## 传统迭代的深拷贝
```js
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

```

## 三种方式
### JSON.parse(JSON.stringify(obj))
缺点：仅能拷贝对象与数组，且其中的 undefined与null无法区分，循环引用也无法处理

### 迭代递归的方法，使用`for...in`
确点：无法拷贝：function、date、reg 和 err，因为他们有特殊的构造函数

### reflect
- Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法
- `Reflect.ownKeys(cloneObj).forEach()`

## 解决循环引用的方式：
- 设置一个 hash 表，比如 `hash = new WeakMap`

