import React from './react';

function sayHello() {
    alert('Hello');
}

let element = React.createElement('button', { id: 'sayHello', onClick: sayHello }, 'say', React.createElement('b', {}, 'Hello'));
console.log(element);

React.render(element, window.root);
