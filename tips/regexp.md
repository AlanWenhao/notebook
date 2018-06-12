## 一些正则的实践笔记

### 关于 `|`
> 指明两项之间的一个选择。要匹配 |，请使用 \|

将 `[object Sting]` 去除为 `String`
```js
const input = '[object Sting]';
const output = input.replace(/\[object\s+|\]/g, '');
console.log(output); // String
```
- 注意：
    - 匹配 `[` 或 `]` 需要使用转义，因为 `[` 和 `]` 在正则中是 `标记一个中括号表达式的开始和结束`
    - 匹配了开始的 `[object `之后匹配后面的 `]` 记得使用 `|`，另外正则需要 `/g`