import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import actions from '../store/actions/user';

class AddArticle extends Component {
    constructor(props) {
        super();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.title.value;
        const author = this.author.value;
        const category = this.category.value;
        const content = this.content.value;
        const user = {
            title,
            author,
            category,
            content
        }
        this.props.addArticle(user);
    }

    render() {
        // console.log('redux', connect);
        return (
            <form onSubmit={this.handleSubmit}>
                <h3 className="text-center">发表文章</h3>
                <div className="form-group">
                    <label htmlFor="title">题目</label>
                    <input type="text" className="form-control" ref={input => this.title = input} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">作者</label>
                    <input type="text" className="form-control" ref={input => this.author = input} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">类别</label>
                    <input type="text" className="form-control" ref={input => this.category = input} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">正文</label>
                    <textarea className="form-control" rows="5" ref={input => this.content = input} ></textarea>
                </div>
                <div className="text-center">
                    <Button type="submit" variant="contained" color="primary">发布</Button>
                </div>
            </form>
        );
    }
}

export default connect(
    state => state.article,
    actions
)(AddArticle);
