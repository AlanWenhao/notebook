import * as types from '../action-types';

export default {
    login(payload) {
        return { type: types.LOGIN, payload };
    }
}
