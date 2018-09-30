// 在这里实现 reducer 的合并
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';

const reducers = combineReducers({
    user,
    router: routerReducer
});

export default reducers;
