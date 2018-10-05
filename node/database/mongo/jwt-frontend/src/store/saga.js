import { takeEvery, put, call, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from './action-types';
import userApi from '../api/user';
import { decode } from '../utils/jwt';

function* login(action) {
    const { payload } = action;
    try {
        console.log('发送过来的数据', payload);
        const res = yield call(userApi.login, payload);
        const jwtToken = res.data.data.jwtToken;
        window.localStorage.setItem('token', jwtToken);
        const user = decode(jwtToken);
        console.log(user);
        // put 参数是一个 action ，put 用来向仓库派发一个 action ，相当于 store.dispatch(action)
        yield put({type: types.LOGIN_SUCCESS, user});
        yield put(push('/'))
    } catch(err) {
        yield put({ type: types.LOGIN_ERROR, err });
    }
}

function* loadUser() {
    let jwtToken = window.localStorage.getItem('token');
    if (jwtToken) {
        const user = decode(jwtToken);
        yield put({type: types.LOGIN_SUCCESS, user });
    }
}

function* logout() {
    window.localStorage.removeItem('token');
    yield put({ type: types.LOGOUT_SUCCESS });
    yield put(push('/'));
}


function* loginFlow() {
    // 当监听到 LOGIN 的动作，会交给 login 函数处理
    yield takeEvery(types.LOGIN, login);
    yield takeEvery(types.LOGOUT, logout);
}
function* watchLoadUser() {
    yield takeEvery(types.LOAD_USER, loadUser);
}

export default function* rootSaga() {
    yield all([loginFlow(), watchLoadUser()]);
}
