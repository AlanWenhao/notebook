const UPDATE_TEXT = 'UPDATE_TEXT';
const UPDATE_BACKGROUND_COLOR = 'UPDATE_BACKGROUND_COLOR';

/**
 * 修改state，必须通过dispatch
 * @param {Object} reducer 
 */
function createStore(reducer) {
    let state;
    let listeners = [];
    function getState() {
        return JSON.parse(JSON.stringify(state));
    }
    function dispatch(action) {
        reducer(state, action);
        listeners.forEach(listener => listener());
    }
    function subscribe(listener) {
        listeners.push(listener);

        return function() {
            listeners = listeners.filter(item => item !== listener);
        }
    }

    dispatch({ type: '@@@yuyu' });

    return {
        getState,
        dispatch,
        subscribe
    }
}

/**
 * 处理器Reducer
 * @param {Object} state 老状态
 * @param {Object} action 派发的动作 action
 */
function reducer(state = initState, action) {
    switch(action.type) {
        case UPDATE_TEXT:
            return { ...state, text: action.text };
        case UPDATE_BACKGROUND_COLOR:
            return { ...state.content, backgroundColor: action.backgroundColor };
        default: 
            return state;
    }
}

let initState = {
    text: 'redux设计思想',
    backgroundColor: 'lightblue'
}

// 以下为执行代码
let store = createStore(reducer);

function render() {
    const title = document.title;
    const state = store.getState();
    title.innerHTML = state.text;
    title.style.backgroundColor = state.backgroundColor;
}

render();
store.dispatch({ type: UPDATE_TEXT, text: 'new text' });
store.dispatch({ type: UPDATE_BACKGROUND_COLOR, backgroundColor: 'lightgreen' });
