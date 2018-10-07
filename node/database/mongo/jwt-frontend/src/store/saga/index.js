import { all } from 'redux-saga/effects';
import { loginFlow, watchLoadUser } from './user';
import { watchArticle } from './article';

export default function* rootSaga() {
    yield all([
        loginFlow(),
        watchLoadUser(),
        watchArticle()
    ]);
}