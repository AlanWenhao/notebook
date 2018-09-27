import { createStore, applyMiddleware } from 'redux';
import creatSageMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducers from './reducers';
import rootSaga from './saga';

const sageMiddleware = creatSageMiddleware();
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sageMiddleware, logger)
);
sageMiddleware.run(rootSaga);

window.store = store; // 方便在浏览器中调试，上线的时候删掉！！

export default store;
