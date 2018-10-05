import { createStore, applyMiddleware } from 'redux';
import creatSageMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import rootSaga from './saga';
import history from '../history';

const router = routerMiddleware(history);
const sageMiddleware = creatSageMiddleware();
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sageMiddleware, router, logger)
);
sageMiddleware.run(rootSaga);

window.store = store; // 方便在浏览器中调试，上线的时候删掉！！

export default store;
