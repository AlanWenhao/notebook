# JavaScript 能力测评经典题
> 找出 item 在给定数组arr中的位置,否则返回-1  
> 输入：[1,2,3,4], 3  
> 输出：2  
```js
function indexOf(arr, item) {
    return arr.indexOf(item);
}
--------------------------------
function indexOf(arr, item) {
    arr.map((current, index) => {
        if(current === item) {
            return index;
        }
        return -1;
    });
}
```




