// 在这里实现 reducer 的合并
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import article from './article';

const reducers = combineReducers({
    user,
    article,
    router: routerReducer
});

export default reducers;
