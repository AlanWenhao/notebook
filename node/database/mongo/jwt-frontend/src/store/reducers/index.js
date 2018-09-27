// 在这里实现 reducer 的合并
import { combineReducers } from 'redux';
import user from './user';

const reducers = combineReducers({
    user
});

export default reducers;
