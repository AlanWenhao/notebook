import React from 'react';
import ReactDom from 'react-dom';
import Notification from './notification';
import './toast.css';

function createNotification() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    // 这里得到的是
    const notification = ReactDom.render(<Notification />, div);
    console.log(notification);
    return {
        addNotice(notice) {
            return notification.addNotice(notice);
        },
        destory() {
            ReactDom.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}

// 定义一个变量用于保存 createNotification 返回的对象
let notification;

const notice = (type, content, duration = 2000, onClose) => {
    if (!notification) notification = createNotification();
    return notification.addNotice({ type, content, duration, onClose });
}

export default {
    info(content, duration, onClose) {
        return notice('info', content, duration, onClose);
    },
    success(content, duration, onClose) {
        return notice('success', content, duration, onClose);
    },
    error(content, duration, onClose) {
        return notice('error', content, duration, onClose);
    },
    warning(content, duration, onClose) {
        return notice('warning', content, duration, onClose);
    },
    loading(content, duration, onClose) {
        return notice('loading', content, duration, onClose);
    }
}
