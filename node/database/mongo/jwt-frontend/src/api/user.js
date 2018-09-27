import { post } from './index';

function login(body) {
    return post('/users/signin', body);
}

export default {
    login
}
