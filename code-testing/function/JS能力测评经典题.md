# JavaScript 能力测评经典题

## 数组部分
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

> 移除数组 arr 中的所有值与 item 相等的元素。  
> 不要直接修改数组 arr，结果返回新的数组
```js
function remove(arr, item) {
    return arr.filter(value => value !== item);
}
// 也可以循环比较，然后把符合条件的push到新数组中，再return出这个数组
// 也可以尝试splice() https://www.nowcoder.com/profile/2540730/codeBookDetail?submissionId=12702329
```

> 移除数组 arr 中的所有值与 item 相等的元素。  
> 直接修改数组 arr
```js
function remove(arr, item) {
    arr.forEach((val, index) => {
        if (val === item) {
            arr.splice(index, 1);
        }
    });
    return arr;
}
----------- 华丽分割线 ------------
function remove1(arr, item) {
    var n=arr.length;
     for(var i=0;i<n;i++){
        if(arr[0]!==item) {
            arr.push(arr[0]);
        }   
        arr.shift(); 
    }
    return arr;
}
```

> 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
```js
function append(arr, item) {
    const newArr = [];
    arr.forEach((val) => {
        newArr.push(val);
    });
    newArr.push(item);
    return newArr;
}
----------- 华丽分割线 -------------
// 使用slice浅拷贝arr，然后在push
function append(arr, item) {
    const newArr = arr.slice(0);
    newArr.push(item);
    return newArr;
}
---------- 华丽分割线 -----------
// 使用new Array() 创建新的数组，然后push，注意扩展运算符 ...
function append(arr, item) {
    const newArr = new Array(...arr);
    newArr.push(item);
    return newArr;
}
---------- 华丽分割线 -----------
// concat 返回的是新数组
function append(arr, item) {
    return arr.concat(item);
}
```

> 删除数组 arr 最后一个元素。不要直接修改数组 arr，结果返回新的数组（与上一道神似）
```js
// 利用slice浅拷贝
function truncate(arr) {
    return arr.slice(0,-1);
}
---------- 华丽分割线 -----------
// 利用concat返回新数组的特性
function truncate(arr) {
    const newArr = arr.concat();
    newArr.pop();
    return newArr;
}
---------- 华丽分割线 -----------
//普通的迭代拷贝
function truncate(arr, item) {
    const newArr=[];
    for(let i=0;i<arr.length-1;i++){
        newArr.push(arr[i]);
    }
    return newArr;
}
```

> 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组  
```js
function prepend(arr, item) {
    const newArr = arr.concat();
    newArr.unshift(item);
    return newArr;
}
---------- 华丽分割线 -----------
function prepend(arr, item) {
    return [item].concat(arr);
}
---------- 华丽分割线 -----------
function prepend(arr, item) {
    const newArr = arr.slice(0);
    newArr.unshift(item);
    return newArr;
}
```

> 在数组 arr 开头添加元素 item。不要直接修改数组 arr，结果返回新的数组  
```js
function curtail(arr) {
    var newArr = arr.slice();
    newArr.shift();
    return newArr;
}
---------- 华丽分割线 -----------
// 直接slice
function curtail(arr) {
    return arr.slice(1);
}
// 利用concat返回新数组的方法，大同小异
```

> 合并数组 arr1 和数组 arr2。不要直接修改数组 arr，结果返回新的数组
```js
function concat(arr1, arr2) {
    return arr1.concat(arr2);
}
---------- 华丽分割线 -----------
// 普通迭代拷贝
function concat(arr1, arr2) {
    var newArr=[];
    for(var i=0;i<arr1.length;i++){
        newArr.push(arr1[i]);
    }
    for(var j=0;j<arr2.length;j++){
        newArr.push(arr2[j]);
    }
    return newArr;
}
```
> 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
```js
// 截取前后段部分，插入，concat
function insert(arr, item, index) {
    const front = arr.slice(0, 2);
    const end = arr.slice(2);
    front.push('item');
    return front.concat(end);
}
---------- 华丽分割线 -----------
// 直接使用splice()，但改变的是浅拷贝的数组
function insert(arr, item, index) {
    const newArr = [].concat(arr);
    newArr.splice(index, 0, item);
    return newArr;
}
```

> 统计数组 arr 中值等于 item 的元素出现的次数
```js
// 基本循环
// 使用map方法能够得到相同的结果
function count(arr, item) {
    var count = 0;
    arr.forEach((val) => {
        if(val === item) count ++;
    });
    return count;
}
---------- 华丽分割线 -----------
// 利用filter返回新数组，然后返回新数组的长度
function count(arr, item) {
    const newArr = arr.filter((val) => {
        return item === val;
    });
    return newArr.length;
}
```

