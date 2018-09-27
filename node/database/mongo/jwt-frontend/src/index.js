import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import history from './history';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.css';
// ConnectedRouter 用来替代 hashrouter，连接组件与仓库，实现可以使用 派发 action 跳转路由
ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, window.root
);
