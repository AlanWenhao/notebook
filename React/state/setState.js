let state = {
  number: 0
}

let callbacks = [];
callbacks.push([(state) => ({ number: state.number + 1 }), () => { console.log(state) }])
callbacks.push([(state) => ({ number: state.number + 1 }), () => { console.log(state) }])
callbacks.push([(state) => ({ number: state.number + 1 }), () => { console.log(state) }])

let v;
let fns = [];
while ((v = callbacks.shift())) {
  const [cb, fn] = v;
  let partialState = cb(state);
  // 这一步是因为 setState 是一个覆盖的过程，未更改的 state 会被保留，增量覆盖
  for (let key in partialState) {
    state[key] = partialState[key]
  }
  fns.push(fn);
}

fns.forEach(fn => fn());

console.log(state);
