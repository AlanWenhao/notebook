function count(arr, item) {
    const newArr = arr.filter((val) => {
        return item === val;
    });
    return newArr.length;
}
const arr = [1,2,4,4,3,4,3];
const result = count(arr, 4);
console.log(result);
console.log(arr);
