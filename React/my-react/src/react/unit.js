import $ from 'jquery';

class Unit {
    constructor(element) {
        this._currentElement = element;
    }
}

class ReactTextUnit extends Unit {
    getMarkup(rootId) {
        this._rootId = rootId;
        return `<span data-reactid=${rootId}>${this._currentElement}</span>`;
    }
}

class ReactNativeUnit extends Unit {
    getMarkup(rootId) {
        this._rootId = rootId;
        const { type, props } = this._currentElement;
        let childString = '';
        let tagStart = `<${type} data-reactid="${rootId}"`;
        const tagEnd = `</${type}>`;

        // 深度先序遍历
        for (let propKey in props) {
            if (/^on[A-Z]/.test(propKey)) { // 说明要绑定事件
                let eventType = propKey.slice(2).toLowerCase();
                // 因为这时候还没有DOM，所有的事件只能代理到 document 上
                $(document).delegate(`[data-reactid="${rootId}"]`, eventType, props[propKey]);
            } else if (propKey === 'children') {
                let children = props.children || [];
                childString = children.map((child, index) => {
                    const childReactunit = createReactUnit(child);
                    return childReactunit.getMarkup(`${rootId}.${index}`);
                }).join('');
            } else {
                tagStart += ( ' ' + propKey + '=' + props[propKey]);
            }
        }

        return tagStart + '>' + childString + tagEnd;
    }
}

class ReactCompositeUnit extends Unit {
    // 自定义组件是由 render 方法的返回值决定的，返回的是一个虚拟 dom，也就是 Element 的实例
    // 自定义组件有可能返回自定义组件，但是最终肯定是返回native节点的
    getMarkup(rootId) {
        this.rootId = rootId;
        // 对于自定义组件来说，type就是class，这里重命名为Compoennt
        const { type: Component, props } = this._currentElement;
        // 创建自定义组件的实例，注意这里的props是哪里来的，是Element的实例上的属性
        const componentInstance = this._componentInstance = new Component(props); // this._componentInstance保存是为了setState时候做指针使用
        componentInstance.componentWillMount && componentInstance.componentWillMount();
        const renderedElement = componentInstance.render(); // 得到返回的虚拟dom
        const renderedUnitInstance = createReactUnit(renderedElement); // 获取要渲染的单元实例
        const renderedMarkup = renderedUnitInstance.getMarkup(rootId); // 获取对应的HTML字符串
        // 注意这个mounted事件是在哪里触发的，是在index.js的render方法中触发的
        // mounted触发，代表所有的节点都已经挂在完毕，子节点先触发，随后父节点触发
        // 这里也可以看到，render是由子节点到父节点的执行的，因为下面的on方法实在节点渲染出html之后再绑定的，所以是从下到上
        $(document).on('mounted', () => {
            componentInstance.componentDidMount && componentInstance.componentDidMount();
        })
        return renderedMarkup;
    }
}

/**
 * 工厂方法，根据参数产生不同类型的实例，一般这些实例都是同一个父类的子类
 */
function createReactUnit(element) {
    if (typeof element === 'number' || typeof element === 'string') return new ReactTextUnit(element);
    // { type: 'button', props: {} } 说明是原生dom节点
    if (typeof element === 'object' && typeof element.type === 'string') return new ReactNativeUnit(element);
    if (typeof element === 'object' && typeof element.type === 'function') return new ReactCompositeUnit(element);
}

// 问题，如果节点很多的话，工厂方法里会一直new对象，这样出现大量的对象
// React中有对象缓存池，就是说，在createReactUnit中已经存在的对象会被缓存，之后的对象在一定条件下可以复用

export default createReactUnit;
