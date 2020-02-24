# typescript

## null、undefined 和 void
- `void`表示没有任何类型，当一个函数没有返回值时候，可以使用void
- 实际上只有 `null` 和 `undefined` 可以复制给 `void`
```ts
const a: void = undefined;
```

- 默认情况下，`null` 和 `undefined` 是所有类型的子类型，就是说你可以吧 `null` 和 `undefined` 赋值给 `number` 类型的变量
- 但是在正式项目中一般都是开启 `--strictNullChecks` 检测，就是说 `null` 和 `undefined` 仅能赋值给 `any` 和他们本身，**例外**是 `undefined` 也是可以分配给 `void`

## Symbol
- 在使用 `Symbol` 的时候，在`tsconfig`文件中必须添加 `es6` 的编译辅助库
```json
{
    "lib": ["es6", "dom"]
}
```

## BigInt
- 在ts中`bigint`类型与`number`定义的两个变量是类型不同的，即两者的类型实际是不同的
- BigInt类型在 TypeScript3.2 版本被内置，使用其可以安全的存储和操作大整数，即使这个数已经超过了JavaScript构造函数`Number`能够表示的安全整数范围
- 在使用 `BigInt` 的时候，也必须在 `tsconfig.json` 中声明编译库的类型 `ESNext`
```json
{
    "lib": ["es6", "dom", "ESNext"]
}
```

## TypeScript常见的其他类型
> - 顶级类型 `any` 与 `unknown`  
> - 底部类型 `never`  
> - 非原始类型 `object`  
> - 数组、元组

## unknown
- `unknown` 是TypeScript3.0 引入的新类型，是 `any` 类型对应的安全类型
- 共同点与不同点，所以说 `unknown` 是更安全的 `any`
    - 共同点。都可以表示**一级**的其他类型，例如`boolean`, `number`, `string`, `Symbol`,  `object`, `array`
    - 不同点。`any` 可以表示 `value.foo.bar`，但是 `unknown` 不行
- 也就是说，两者都可以表示任意类型，但是 `unknown` 类型在被确定为某个类型之前，是不能够调用此类型的方法的

```ts
// 比如常见的使用场景
function getValue(value: unknown): string {
    if (value instanceof Date) { // 这里由于把value的类型缩小为Date实例的范围内,所以`value.toISOString()`
        return value.toISOString();
    }

    return String(value);
}
```

## never
> never 类型表示那些永远不存在的值的类型，`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而**任何类型都不可以赋值给never类型**，也没有任何类型是 `never` 的子类型

下面的两个场景 `never` 比较常出现
```ts
// 抛出异常的函数永远不会有返回值
function error(message): never {
    throw new Error(message)
}

// 空数组，而且永远是空的
const empty: never[] = [];
```

## object
- `object` 类型**表示非原始类型**，也就是除 number, string, boolean, symbol, null 或 undefined 之外的类型
```ts
enum Direction {
    Center = 1
}

let value: object

value = Direction
value = [1]
value = [1, 'hello']
value = {}
```

## 元组越界问题
> 对于已经定义的元组，ts允许向其使用数组的 `push` 方法插入新的元素，单不允许访问
```ts
const tuple: [string, number] = ['a', 1];
tuple.push(2); // ok

console.log(tuple); // ["a", 1, 2]
console.log(tuple[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'
```
