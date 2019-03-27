import React from './react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { number: 1 }
    }
    componentWillMount() {
        console.log('will mount');
    }
    componentDidMount() {
        console.log('did mount');
    }

    handleClick = () => {
        this.setState({ number: this.state.number + 1 });
    }

    render() {
        let p = React.createElement('p', {}, this.state.number);
        let button = React.createElement('button', { onClick: this.handleClick}, '+');
        return React.createElement('div', {id: 'couter'}, p, button);
    }
}

// function sayHello() {
//     alert('Hello');
// }
// let element = React.createElement('button', { id: 'sayHello', onClick: sayHello }, 'say', React.createElement('b', {}, 'Hello'));

let element = React.createElement(Counter, { name: '我的计数器' });
React.render(element, window.root);
