import { takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as types from '../action-types';
import articleApi from '../../api/article';

function* addArticle(action) {
    const { payload } = action;
    try {
        const res = yield call(articleApi.addArticle, payload);
        if (res.data.code === 0) {
            yield put({ type: types.ADD_ARTICLE_SUCCESS });
            yield put(push('/articles/list'));
        } else {
            yield put({ type: types.ADD_ARTICLE_FAILED, err: res.data.err });
        }
    } catch(err) {
        yield put({ type: types.ADD_ARTICLE_FAILED, err });
    }
}

export function* watchArticle() {
    yield takeEvery(types.ADD_ARTICLE, addArticle);
}
