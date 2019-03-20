1. ref 在vue中可以指定多个dom吗？如果指定多个得到的是数组吗？如果想通过ref取到domlist应该怎么做？
```
不能取到多个，想取到多个可以
<div v-for="i in 3" :key="i">
    <div ref="dom"></div>
</div>
```

2. 如果在父组件中注册了一个名为 `my-component` 的组件，而将ref直接写在 `my-component` 标签上，父组件通过 `this.refs.com` 拿到的是什么？
```
拿到的是 my-component 这个对象，VueComponent
扩展，既然拿到的是对象，那么就意味着父组件可以直接调用子组件实例的方法，也可以作为一种父子组件通信的方式，一些常见的库都是通过这种方式通信
this.refs.com.showAlert()
```

3. 使用 `directive` 写一个限制输入长度的指令
```js
/**
 * 1、通过函数的形式处理
 * 2、通过对象的形式处理
 * 3、指令概念三要素：bind、update、inserted
 **/
// <input type="text" v-split.5="msg" />
Vue.directive('split', {
    bind(el, bindings, vnode) {
        let ctx = vnode.context;
        let [, len] = bindings.rawName.split('.');
        el.addEventListener('input', e => {
            let val = e.target.value.slice(0, len);
            ctx[bingings.expression] = val;
            el.val = val;
        };
        el.value = ctx[bindings.expression].slice(0, 3); // 处理默认值
    },
    update(el, bindings, vnode) {
        let ctx = vnode.context;
        el.value = ctx[bindings.expression]
    }
});
```

4. filter 跟 computed 相比有什么不同
```
指令仅仅用于改变视图中数据的展示
指令与directive中的 this 都指的是 window
指令可以指定全局的，而computed不行
filter支持传参
```
