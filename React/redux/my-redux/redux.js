const UPDATE_TEXT = 'UPDATE_TEXT';
const UPDATE_BACKGROUND_COLOR = 'UPDATE_BACKGROUND_COLOR';
const UPDATE_BODY_BACKGROUND_COLOR = 'UPDATE_BODY_BACKGROUND_COLOR';

/* ----------------------- redux核心代码 ------------------------- */
// 定义初始state
const initState = {
    text: 'redux设计思想',
    backgroundColor: 'lightblue'
}

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
        state = reducer(state, action);
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
            return { ...state, backgroundColor: action.backgroundColor };
        case UPDATE_BODY_BACKGROUND_COLOR:
            return { ...state, bodyBackgroundColor: action.bodyBackgroundColor }
        default: 
            return state;
    }
}

/* ----------------------- redux核心代码 ------------------------- */



/* ----------------------- 执行区域 ------------------------- */

let store = createStore(reducer);

// 渲染dom
function render() {
    const title = document.querySelector('#title');
    const body = document.body;
    const state = store.getState();
    title.innerHTML = state.text;
    title.style.backgroundColor = state.backgroundColor;
    body.style.backgroundColor = state.bodyBackgroundColor;
}

store.subscribe(render);

// 取消订阅
// setTimeout(() => {
//     store.subscribe(render)();
//     alert('取消订阅);
// }, 5000);

setInterval(() => {
    store.dispatch({ type: UPDATE_TEXT, text: `Redux思想&nbsp${new Date().getSeconds()}s` });
    store.dispatch({ type: UPDATE_BACKGROUND_COLOR, backgroundColor: circleColor(1) });
    store.dispatch({ type: UPDATE_BODY_BACKGROUND_COLOR, bodyBackgroundColor: circleColor() });
}, 1000);

/* ----------------------- 执行区域 ------------------------- */



/* ----------------------- 公用函数 ------------------------- */ 
/**
 * 获取随机颜色
 */
function circleColor(hammer) {
    const index = hammer ? (new Date().getSeconds() + hammer) % 10 : new Date().getSeconds() % 10;
    const colorList = [
        '#ffe8e0',
        '#fdbea8',
        '#ff9773',
        '#ff7849',
        '#ff612a',
        '#fb4202',
        '#cb3400',
        '#8e2400',
        '#5c1700',
        '#000000'
    ];
    return colorList[index];
}

