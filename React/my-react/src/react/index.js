import $ from 'jquery';
import createReactUnit from './unit';
import createElement from './element';

let React = {
    nextRootIndex: 0, // 下一个根节点的索引号
    render,
    createElement
};

function render(element, container) {
    // 为了以后扩展方便，定义了一个工厂方法，传入element，返回正确的实例
    let unitInstance = createReactUnit(element);
    console.log(unitInstance);
    // 通过实例获取此实例的html片段
    let markup = unitInstance.getMarkup(React.nextRootIndex);
    console.log(markup);
    $(container).html(markup);
    // $(document).trigger('mounted'); // 触发一个自定义事件mounted，因为在getMarUp方法里不同的组件都会监听mounted
}

export default React;
