import * as types from '../action-types';

const initState = {
    user: null,
    err: null
};

export default function(state = initState, action) {
    switch(action.type) {
        case types.LOGIN_SUCCESS:
            return { ...state, user: action.user, err: null }
        case types.LOGIN_ERROR:
            return { ...state, user: null, err: action.err }
        case types.LOGOUT_SUCCESS:
            return { ...state, user: null, err: null }
        default: 
            return state;
    }
}
