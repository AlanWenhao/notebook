# react typescript 项目备注点

## 1.好用的**工具泛型**
> Record 定义对象类型  
> Partial 定义可选可选类型  
> 

- 用于定义一个javascript对象，key是字符串，value是任意类型
```ts
const people:Record<string, any> = {
    name: 'Alan',
    age: 10
}
```

- `Partial` 的作用是将传入的属性变为可选项
```ts
interface iPeople {
    title: string;
    name: string;
}

const people: Partial<iPeople> = {
    title: 'Delete inactive users',
}
```

- `Readonly` 将传入的属性变为只读属性
```ts
interface iPhone {
    title: string;
    name: string;
}
// title name属性变为只读
const people: Readonly<Todo> = {
    title: 'todo list',
    name: 'Alan'
}
```

- `Required`将传入的属性变为必选项
```ts
interface iPeople {
    title?: stirng;
    name?: string;
}

const people1: Props { title: 'ts' }; // OK
const people2: Required<iPeople> = { title: 'ts' }; // Error: property 'name' missing
```

## 2.keyof
```ts
interface iPeople {
    name: string;
    age: number;
}

type T = keyof iPeople // 'name' | 'age'
```

## 3.in
```ts
type Keys = 'a' | 'b';
type Obj = {
    [p in Keys]: any
}
// 与 { a: any, b: any } 效果相同
```

