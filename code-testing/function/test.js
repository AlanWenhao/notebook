function sum(arr) {
    let total = 0;
    arr.forEach((item) => {
        total += item
    });
    return total;
}
const result = sum([1,2,3,4]);
console.log(result);
