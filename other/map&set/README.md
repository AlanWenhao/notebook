## Map, set WeakMap and WeakSet
> 之前我们学过了 
> - 存放键值对的对象
> - 存放有序集合的数组  

### 扩展链接
- [map set 实际运用](https://www.haorooms.com/post/js_map_set)

### map
map也是一个键值对的集合，就像`Object`，但不同的是，`Map`允许任意类型的`key`
主要的方法有：
- `new Map()` 创建map，必须通过new关键字
- `map.set(key, value)` 通过 key 保存数据项
- `map.get(key)` 通过 key 获取数据项，如果 key 不存在返回 `undefined`
- `map.has(key)` 返回 true 或 false，取决于该项key是否存在
- `map.delete(key)` 通过 key 删除值
- `map.clear()` 清空map
- `map.size` 返回 map 

例如：
```js
let map = new Map();
map.set(1, 'num1');
map.set(true, 'bool1');

console.log(map.get(1));
console.log(map.get('1'));
console.log(map.get(true));
console.log(map.size);
```

可以看到不同于 `Object` 的是，key没有被转换为`string`

场景例如：使用`visitsCounts`来存储用户访问次数
```js
// before 我们需要依赖一个 Id 来为object做唯一标注
let john = { name: 'John', id: 1 };
let visitCounts = {};

visitCounts[john.id] = 123;
console.log([john.id]);
```
```js
// after using map
let john = { name: 'john' };
let visitCounts = new Map();
visitCounts.set(john, 123);
console.log(visitCounts.get(john));
```

> map 是怎么比较 key 的
> map比较使用的算法是[SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)可以粗略的理解为与 `===` 大致相同，但是不同的是 `NaN` 被认为与 `NaN` 相等，所以，`NaN`是可以作为map的key的，这一算法不能被改变或者自定义

链式操作：
每次`map.set`方法被调用都会返回 map 对象本身，所以我们可以再次基础上进行链式操作
```js
map.set('1', 'str1').set(2, 'str2').set(true, 'boolean');
```

### 从 `Object` 到 `Map`
在创建 Map 时，我们可以传入具有key value对的数组（或其他可迭代对象）
```js
const map = new Map([
    [1, 'str1'],
    [2, 'str2'],
    [3, 'str3']
]);
```

有一个内建方法[Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)，接收对象，返回一个key value对的二维数组
```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
// Object.entries(obj) returns the key/value pairs: [['name', 'John'], ['age', 30]]
```

### 迭代map 注意返回的可迭代对象并非数组，不具有数组的方法
> 迭代 map 有三种方法
> - `map.keys()` 返回一个可迭代对象 iterable 包含keys
> - `map.values()` 返回一个可迭代对象 iterable 包含values
> - `map.entries()` 返回一个可迭代对象 iterable 包含 entries `[key, value]`，其在 `for of` 中被默认使用

例如：
```js
let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 300],
    ['onion', 200],
]);

// 通过 keys 遍历
for (let vegetable of recipeMap.keys()) {
    console.log(vegetable); // cucumber, tomatoes, onion
}

// 通过 values 遍历
for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 300, 200
}

// 通过 entries 遍历
for (let entry of recipeMap) { // 或 let entry of recipeMap.entries()
    console.log(entry); // ['cucumber', 500] ['tomatoes', 300] ['onion', 200]
}
```

除此之外，Map还有内建的 ForEach方法可以提供遍历
```js
recipeMap.forEach((value, key, map) => {
    console.log(value, key, map)
});
```

与常规对象不同的是，迭代的顺序与插入值得顺序相同，map会保留次顺序

### Set 注意返回的可迭代对象并非数组，不具有数组的方法
> set 是一个不重复值得集合
> - `new Set()`
> - `set.add(value)`
> - `set.delete(value)`
> - `set.has(value)`
> - `set.clear()`
> - `set.size`

比如：常用在类似去重的场景
```js
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

### 迭代Set
> - `set.keys()` 返回一个可迭代对象
> - `set.values()` 同set.keys()，__为了兼容 Map__
> - `set.entries()` 返回 [value, value] 的可迭代对象，__为了兼容 Map__
> 可以通过 `for...of` 和 `forEach` 迭代任意一个 Set

----

### WeakMap and WeakSet
> 首先，了解一下垃圾回收的几个常见例子

```js
let john = { name: "John" };
john = null;
// 置空之后 john 将会被垃圾回收

----------

// 但是如果相同的数据结构存储在数组或者对象的属性中，即使源对象被置空，john 也不会被垃圾回收，他会始终保存在数组或者对象这些数据结构中
let john = { name: "John" };
let array = [ john ];
john = null; // overwrite the 

----------

// 作为key保存在 Map 中也是不会被回收的
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // overwrite the reference
// john is stored inside the map,
// we can get it by using map.keys()
```

但是 weakSet 与 weakMap 与此是不同的，他们不会阻止相应类似的垃圾回收

### weakMap
> - `weakMap` 的 key 只能是 object 而不能是原始值 primitive values
> - 如果我们将这个object的引用置为null，weakMap中的对应项也会被回收

```js
let john = { name: "John" };
let weakMap = new WeakMap();
weakMap.set(john, "...");
john = null; // overwrite the reference
// john is removed from memory! map is empty now
```
与 Map 相比
- weakMap 中的key依赖引用对象，引用对象不存在时，WeakMap中的该项会被自动删除
- WeakMap 不支持迭代并且没有`keys()`, `values()`, `entries()` 方法。由于内部元素的不确定性，与map相比，WeakMap不具有`size`方法
- WeakMap具有以下方法
  - weakMap.get(key);
  - weakMap.set(key, value);
  - weakMap.delete(key, value);
  - weakMap.has(key);

那么这样的数据结构有什么用途呢？
```js
// 还是上面的例子，map存储访客访问次数，访客object作为key存入map，但是如果业务场景是，访客离开之后，其访问次数被清除。
// 如果使用map，访问次数是不会被清除的，但是WeakMap可以做到
let john = { name: "John" };
let visitsCountMap = new WeakMap();
visitsCountMap.set(john, 123);
// now john leaves us, we don't need him anymore
john = null;
```

### WeakSet 与 WeakMap表现类似
> - 与 Set 结构类似，但是仅仅能添加 objects rather than primitives
> - 集合中的对象存在当其在其他地方是存在的
> - 不可迭代，方法具有 `add`, `has`, `delete`。没有 `size`, `keys()` 等方法

### 总结
- Map 一个key value的集合
  - 任何值都能作为key
  - 迭代顺序取决于插入顺序
  - 一些方法，size 属性
- Set 一组独一无二值的集合
  - 不同于数组，不支持数据的重排序
  - 保留了插入顺序
- WeakMap Map的变种，仅允许 object 作为 key ，并且当他们引用不存在时会在WeakMap中被立即删除
  - 不支持作为一个整体的操作，即没有 `size`，没有`clear()`，没有迭代接口
- WeakSet Set 的变种，仅能存储object且当其引用不存在时，存储的值被回收
  - 不支持 `size`， `clear()` ，不支持迭代

### 实例
> 数组去重
```js
function unique(arr) {
  return [...new Set(arr)];
}
```

> 筛除相同字母单词
nap - pan
ear - are - era
cheaters - hectares - teachers
```js
let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    // split the word by letters, sort them and join back
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
    map.set(sorted, word);
  }

  return Array.from(map.values());
}
```

> 有一组数据如下，你的代码可以取到他并且更改他，但是你不能直接修改他，因为这组数据同时被其他使用者所使用。而且当其中的一组message消失时，在你的数据结构中也应该消失。
```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];
let readMessages = new WeakSet();
readMessages.add(messages[0]);
readMessages.add(messages[1]);

// 重复添加已读信息将不会被记录
readMessages.add(messages[0]);

// 删除源数据，readMesages 中的数据也会相应变化
messages.shift();
```
直接使用WeakSet的副作用是我们不能直接循环已读消息，但是我们可以循环所有信息，并使用filter筛选出已读信息

扩展，直接更改messages是危险的，但是我们可以使其变为 symbol 来避免这种情况
```js
// the symbolic property is only known to our code
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

> 如果我们想要存储message的具体信息而不是简单的 yes/no 可以使用weakMap
