function sum(arr) {
    let sumNumber = 0;
   arr.forEach(item => {
        sumNumber += item   
   });
    return sumNumber;
}
console.log(sum([1,2,3,4]));
