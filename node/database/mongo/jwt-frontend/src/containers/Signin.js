import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import actions from '../store/actions/user';

class Signin extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const username = this.username.value;
        const password = this.password.value;
        const user = {
            username,
            password
        }
        this.props.login(user);
    }

    render() {
        return (
            <form className="c-sign">
                <h3 className="text-center">登录</h3>
                <div className="form-group">
                    <label htmlFor="username">用户名</label>
                    <input type="text" className="form-control" ref={input => this.username = input} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">密码</label>
                    <input type="text" className="form-control" ref={input => this.password = input} />
                </div>
                <div className="text-center">
                    {/* <input type="submit" className="form-control btn btn-info" value="登录"/> */}
                    <Button type="submit" variant="contained" color="primary">登录</Button>
                </div>
            </form>
        );
    }
}

export default connect(
    state => state.user,
    actions
)(Signin);