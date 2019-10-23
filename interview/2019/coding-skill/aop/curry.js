// 柯里化，作用就是吧一个函数拆分成多个函数
// 判断类型第一版

// const checkType = (value, type) => {
//   return Object.prototype.toString.call(value) === `[object ${type}]`
// }

// 判断类型第二版
// const types = ['Array', 'Object', 'Number', 'Boolean'];
// let utils = {};
// types.forEach(type => {
//   utils[`is${type}`] = checkType(type)
// })
// function checkType(type) {
//   return function(value) {
//     return Object.prototype.toString.call(value) === `[object ${type}]`
//   }
// }

// console.log(utils.isArray([1,2,3]));

/* --------------- 柯里化的经典题目 ----------------- */
// const add = (a,b,c,d,e) => {
//   return a + b + c + d + e;
// }
// // 把 fn(1)(2,3)(4)(5) 或者 fn(1)(2,3,4)(5)这种类型的函数变成都能实现如上函数的结果
const curring = (fn, arr = []) => {
  let len = fn.length
  return (...args) => {
    arr = arr.concat(args);
    if (arr.length < len) {
      return curring(fn, arr)
    }
    return fn(...arr)
  }
}

// const fn = curring(add);
// console.log(fn(1)(2,3)(4)(5))

// 这里 curring 函数的核心就是把 add 函数的参数保存起来(保存到arr中)，每次判断不够就return出去相同的curring函数，够的话，则实行 add，参数是保存的 arr
// 柯里化的好处能够把函数的功能细化

/* ------ 最后再把checkType函数简化一下 ------ */
// 类比上面的 curring 函数包装 add ，其实就是把原本的 5 个参数分开传，一旦传够了 5 个，那就执行函数
const types = ['Array', 'Object', 'Number', 'Boolean', 'String'];
let utils = {};
const checkType = (type, content) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`
}
types.forEach(type => {
  utils[`is${type}`] = curring(checkType)(type) // 先传入一个参数，那结果就是一个函数 fn(content)
})

console.log(utils.isArray([1,2,3]))
