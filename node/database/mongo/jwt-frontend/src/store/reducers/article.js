import * as types from '../action-types';

const initState = {
    err: null,
}

export default function(state = initState, action) {
    switch(action.type) {
        case types.ADD_ARTICLE_SUCCESS:
            return { ...state, err: null }
        case types.ADD_ARTICLE_FAILED:
            return { ...state, err: action.err }
        default:
            return state;
    }
}
