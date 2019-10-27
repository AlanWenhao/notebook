// const obj = {
//     value: 'test',
//     [Symbol.iterator] : function () {
//         return {
//             next: function () {
//                 return {
//                     value: 1,
//                     done: true
//                 };
//             }
//         };
//     }
// }

// const iter = obj[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());


// class RangeIterator {
//     constructor(start, stop) {
//         this.value = start;
//         this.stop = stop;
//     }

//     [Symbol.iterator]() { return this; }

//     next() {
//         var value = this.value;
//         if (value < this.stop) {
//             this.value++;
//             return {done: false, value: value};
//         }
//         return {done: true, value: undefined};
//     }
// }

// function range(start, stop) {
//     return new RangeIterator(start, stop);
// }

// for (var value of range(0, 3)) {
//     console.log(value); // 0, 1, 2
// }



let range = {
    from: 1,
    to: 5,
}

range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current ++ };
            }
            return { done: true };
        }
    }
}
// for (let num of range) {
//     console.log(num);
// }

// const iter = range[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

const arr = Array.from(range);
console.log(typeof arr[0]);
