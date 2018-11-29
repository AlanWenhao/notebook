const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';
const UPDATE_CONTENT_BG = 'UPDATE_CONTENT_BG';

let state = {
    title: {
        text: 'new title text',
        bg: 'lightblue'
    },
    content: {
        text: 'content',
        bg: 'gold'
    }
}

function dispatch(action) {
    switch (action.type) {
        case UPDATE_TITLE_TEXT:
            state.title.text = action.text;
            return;
        case UPDATE_CONTENT_BG:
            state.content.bg = action.bg;
            return;
        default:
            return;
    }
}

function render(state) {
    renderTitle(state.title);
    renderContent(state.content);
}
function renderTitle(data) {
    const title = window.title;
    title.innerHTML = data.text;
}
function renderContent(data) {
    const content = window.content;
    content.style.backgroundColor = data.bg;
}

render(state);

setTimeout(() => {
    dispatch({ type: 'UPDATE_TITLE_TEXT', text: 'dispatch text' });
    dispatch({ type: 'UPDATE_CONTENT_BG', bg: 'red' });
    render(state);
}, 2000);
