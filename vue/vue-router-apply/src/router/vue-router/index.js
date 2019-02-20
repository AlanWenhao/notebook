/**
 * mode
 * router-link router-view
 * this.$router this.$route
 * Vue.use()
**/

class VueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash';
        this.routes = options.routes || [];
        this.routesMap = this.createMap(this.routes);
        this.history = new HistoryRoute;
        this.init();
    }

    /**
     * 如果是 hash 模式:
     *   1、如果是空路径，添加/#/
     *   2、查看当前hash并将路径存储到 this.history.current 上
     */
    init() {
        // 如果是 hash 模式
        // 1、查看当前hash并将路径存储到 this.history.current 上
        if (this.mode === 'hash') {
            location.hash ? '' : location.hash = '/';
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1);
            });
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1);
            });
        } else {
            location.pathname ? '' : location.pathname = '/';
            window.addEventListener('load', () => {
                this.history.current = location.pathname;
            });
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname;
            });
        }
    }

    /**
     * 将 routes 数组格式化成对象 { '/home': Home, '/about': About }
     * @param {Array} 路由表
     */
    createMap(routes) {
        return routes.reduce((memo, current) => {
            memo[current.path] = current.component;
            return memo;
        }, {})
    }

    go() {}
    push() {}
    back() {}
}

/**
 * 注册全局方法，全局组件
 * 在所有的组件中拿到同一个 VueRouter 的实例 this.$router，
 */
VueRouter.install = function(Vue) {
    // console.log(Vue, 'install');
    Vue.mixin({
        beforeCreate() {
            console.log('-----', this.$options.name);

            if (this.$options && this.$options.router) { // 这个组件是【根组件app】
                this._root = this;
                this._router = this.$options.router;

                // 给第三个参数的数据加上get、set方法，如果是对象，则深度遍历，为其都加上get、set方法
                // 这里为了配合 router-view 组件的【动态渲染】。
                // 不熟悉这里可以看下 observe 方法怎么实现的
                Vue.util.defineReactive(this, 'xx', this._router.history);
            } else { // 非根组件
                // vue 组件选件渲染顺序：先续深度：父 => 子 => 孙，下面的方法就把根组件的 router 实例共享给了所有的组件
                this._root = this.$parent._root;
            }

            Object.defineProperty(this, '$route', {
                get() {
                    return {
                        current: this._root._router.history.current
                    };
                }
            });
            /**
             * 其实就是 VueRouter 的实例，上面具有很多方法，比如push、go等等
             */
            Object.defineProperty(this, '$router', {
                get() {
                    return this._root._router;
                }
            });
        }
    });
    Vue.component('router-link', {
        props: {
            to: String,
            tag: String
        },
        methods: {
            handleClick() {
                // 判断是hash与history时候分别怎么跳转
                alert(1);
            }
        },
        /**
         * 渲染：可以使用两种方式
         */
        render() {
            // 渲染<a>,属性 {}, 内容 '首页'
            // return h('a', {}, '首页');
            const tag = this.tag;
            const mode = this._self._root._router.mode;
            return (tag ? (<tag on-click={this.handleClick} href={mode === 'hash' ? `#${this.to}` : this.to}>{this.$slots.default}</tag>) :
                (<a href={mode === 'hash' ? `#${this.to}` : this.to}>{this.$slots.default}</a>)
            )
        }
    });
    /**
     * 根据当前的状态 current 匹配 路由表
     */
    Vue.component('router-view', {
        render(h) {
            // 因为 router-view 组件的定义优先于 VueRouter 实例下 init 中 onlload 后 hashchange 的事件，所以要将 current 设置成【动态】的，mixin中有设置
            const current = this._self._root._router.history.current;
            const routeMap = this._self._root._router.routesMap;
            console.log(current);
            console.log(routeMap);
            return h(routeMap[current]);
        }
    });
}

/**
 * 实例存存放当前路径
 */
class HistoryRoute {
    constructor() {
        this.current = null;
    }
}

// 使用 Vue.use 必须具有 install 方法
export default VueRouter;

