import React, { Component } from 'react';

class Counter extends Component {
    state = {
        number: 0,
    }
    render() {
        return (
            <div>
                <p>{this.state.num}</p>
                <button onClick={() => this.setState({ number: this.state.number + 1 })}>+</button>
            </div>
        );
    }
}

export default Counter;
