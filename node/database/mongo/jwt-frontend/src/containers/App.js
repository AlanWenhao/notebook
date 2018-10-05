import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import Header from '../components/Header';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Route exact path="/" component={Home} />
                            <Route exact path="/users/signin" component={Signin} />
                            <Route exact path="/users/signup" component={Signup} />
                            <Route exact path="/articles/add" component={AddArticle} />
                            <Route exact path="/articles/list" component={ArticleList} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default App;
