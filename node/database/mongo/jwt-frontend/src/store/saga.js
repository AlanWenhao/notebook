import { takeEvery, put, all } from 'redux-saga/effects';
import * as types from './action-types';

function* login(action) {
    const { payload } = action;
    console.log(payload);
}

function* loginFlow() {
    // 当监听到 LOGIN 的动作，会交给 login 函数处理
    yield takeEvery(types.LOGIN, login)
}

export default function* rootSaga() {
    yield all([loginFlow()]);
}
