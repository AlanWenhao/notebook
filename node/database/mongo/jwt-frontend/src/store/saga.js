import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as types from './action-types';
import userApi from '../api/user';
import { decode } from '../utils/jwt';

function* login(action) {
    const { payload } = action;
    try {
        console.log('发送过来的数据', payload);
        const res = yield call(userApi.login, payload);
        const jwtToken = res.data.data.jwtToken;
        const user = decode(jwtToken);
        console.log(user);
        yield put({type: types.LOGIN_SUCCESS, user});
    } catch(err) {
        yield put({ type: types.LOGIN_ERROR, err });
    }
}

function* loginFlow() {
    // 当监听到 LOGIN 的动作，会交给 login 函数处理
    yield takeEvery(types.LOGIN, login)
}

export default function* rootSaga() {
    yield all([loginFlow()]);
}
