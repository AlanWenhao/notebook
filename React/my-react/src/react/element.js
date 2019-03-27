class Element {
    constructor(type, props) {
        this.type = type;
        this.props = props;
        this.key = props.key; // dom diff
    }
}


function createElement(type, props = {}, ...children) {
    props.children = children;
    return new Element(type, props);
}

export default createElement;
