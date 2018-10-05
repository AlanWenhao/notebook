import * as types from '../action-types';

export default {
    login(payload) {
        return { type: types.LOGIN, payload };
    },
    loadUser() {
        return { type: types.LOAD_USER }
    },
    logout() {
        return { type: types.LOGOUT }
    }
}
