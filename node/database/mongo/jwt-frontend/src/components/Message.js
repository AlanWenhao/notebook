import React, { Component } from 'react';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="o-message">
                <div className="o-message__icon">111</div>
                <div className="o-message__text">{this.props.text}</div>
            </div>
        );
    }
}

export default Message;