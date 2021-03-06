import Vue from 'vue'
import Vuex from './vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        a: {
            modules: {
                b: {
                    state: { count: 300 }
                }
            },
            state: { count: 200 },
            mutations: {
                change1(state) {
                    state.count += 200;
                }
            }
        }
    },
    state: {
        count: 100
    },
    getters: {
        newCount(state) {
            return state.count * 2;
        }
    },
    mutations: {
        change(state) {
            state.count += 10;
        },
        test() {
            console.log('test');
        }
    },
    actions: {
        // 这里传入的是 { commit } 原因在于初始化 actions 的时候 call 传入的参数是 store，也就是 Store 的实例
        change(aa) {
            console.log(aa);
        }
    }
})
