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

/**
 * 工厂方法，根据参数产生不同类型的实例，一般这些实例都是同一个父类的子类
 */
function createReactUnit(element) {
    if (typeof element === 'number' || typeof element === 'string') return new ReactTextUnit(element);
    // { type: 'button', props: {} } 说明是原生dom节点
    if (typeof element === 'object' && typeof element.type === 'string') return new ReactNativeUnit(element);
}

export default createReactUnit;
