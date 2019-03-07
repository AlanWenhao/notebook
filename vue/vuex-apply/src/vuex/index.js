class ModuleCollection {
    constructor(options) { // [] 代表跟模块，[a] 代表字母快，[a,b] 代表子模块 a 中有 孙模块 b
        this.register([], options);
    }
    register(path, rawModule) {
        let newModule = {
            _raw: rawModule, // 当前模块的store
            _children: {}, // 包含的子模块
            state: rawModule.state // 当前面模块的状态
        }
        if (path.length === 0) { // 根模块
            this.root = newModule;
        } else { // 将子模块挂在父的 _children 上，使用 reduce 动态找出每个根，并在下一步给每个根加上children
            let parent = path.slice(0, -1).reduce((root, current) => {
                return root._children[current]
            }, this.root);
            // 给每个根加上children
            parent._children[path[path.length - 1]] = newModule;
        }

        if (rawModule.modules) { // 有子模块
            forEach(rawModule.modules, (childName, module) => {
                this.register(path.concat(childName), module); // 递归调用 register，如果有子模块，将会进入上个判断的 else
            });
        }
    }
}

function installModule(store, rootState, path, rootModule) {

    if (path.length > 0) { // 

        let parent = path.slice(0,-1).reduce((root, current) => {
            return root[current];
        }, rootState)
        Vue.set(parent, path[path.length - 1], rootModule.state);
    }

    if (rootModule._raw.getters) {
        forEach(rootModule._raw.getters, (getterName, getterFn) => {
            Object.defineProperty(store.getters, getterName, {
                get: () => getterFn(rootModule.state) // 这里保证传入的state都是当前 module 下的
            });
        });
    }
    if (rootModule._raw.actions) {
        forEach(rootModule._raw.actions, (actionName, actionFn) => {
            let entry = store.actions[actionName] || (store.actions[actionName] = []);
            entry.push(() => {
                actionFn.call(store, rootState);
            });
        });
    }
    if (rootModule._raw.mutations) {
        forEach(rootModule._raw.mutations, (mutationName, mutationFn) => {
            let entry = store.mutations[mutationName] || (store.mutations[mutationName] = []);
            entry.push(() => {
                mutationFn.call(store, rootModule.state);
            });
        });
    }
    forEach(rootModule._children, (childName, module) => {
        installModule(store, rootState, path.concat(childName), module);
    });
}

class Store { // state getters actions mutations
    constructor(options) {
        let state = options.state;
        this.getters = {};
        this.mutations = {};
        this.actions = {};
        // 具有双向绑定热性的数据，需要具有 get 与 set
        // vuex的核心就是借用了 vue 的实例，因为vue实例的数据变化会刷新视图
        this._vm = new Vue({
            data: {
                state
            }
        });

        // 整理模块 module 关系，使 vuex 的 state 形成一个树状结构，而 mutations 则是平行关系
        this.modules = new ModuleCollection(options);

        /**
         * 从根模块开始注册模块，挂在每层的state
         */
        installModule(this, state, [], this.modules.root);

        /* if (options.getters) {
            let getters = options.getters;
            forEach(getters, (getterName, getterFn) => {
                Object.defineProperty(this.getters, getterName, {
                    get: () => {
                        return getterFn(state);
                    }
                });
            })
        }

        // 为当前实例的 mutations 上添加属性，值为函数，并且函数的指向是当前实例，且值为传入的值
        let mutations = options.mutations;
        forEach(mutations, (mutationName, mutationFn) => {
            this.mutations[mutationName] = () => {
                mutationFn.call(this, state);
            }
        });

        let actions = options.actions;
        forEach(actions, (actionName, actionFn) => {
            this.actions[actionName] = () => {
                // 这里给 actionFn 传入的参数是 this，所以在 store.js 中需要解构传入 { commit }
                actionFn.call(this, this);
            }
        }); */

        // 这里先拿到原型上的方法 commit 与 dispatch，然后再在【实例】上重写 commit 与 dispatch 方法，原因在于：
        // 重写之后，实例调用上面的两个方法，会优先选择实例上的方法而不是原型上的方法
        // 重写之后可以绑定this。 这么做是因为在 store.js 中，action 中直接调用 commit 没有上下文，而这里可以将上下文绑定为【实例】store
        let { commit, dispatch } = this;
        this.commit = (type) => {
            commit.call(this, type);
        }
        this.dispatch = (type) => {
            dispatch.call(this, type)
        };
    }
    get state() { // 类似于 Object.defineProperty 中的 get
        return this._vm.state;
    }
    commit(type) {
        this.mutations[type].forEach(fn => fn());
    }
    dispatch(type) {
        this.actions[type].forEach(fn => fn());
    }
}

let Vue;
const install = (_Vue) => {
    Vue = _Vue; // 保留构造函数，为了避免用户多次use vuex 而多次执行
    Vue.mixin({ // 给所有的 vue 组件都混入了下面的方法
        beforeCreate() {
            // 将根组件中的 Store 实例，给每个组件都增加一个 $store 的属性
            if (this.$options && this.$options.store) { // 是否是根组件
                this.$store = this.$options.store;
            } else { // 子组件，因为 vue 渲染是从父到子，深度优先加载的
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    });
}

function forEach(obj, cb) {
    Object.keys(obj).forEach(item => cb(item, obj[item]));
}

export default {
    Store,
    install
}
