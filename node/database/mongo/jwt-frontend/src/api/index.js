import axios from 'axios';
const BASE_URl = 'http://localhost:8888';

axios.interceptors.request.use((config) => {
    let jwtToken = window.localStorage.getItem('token');
    if (jwtToken) {
        config.headers.authorization = jwtToken;
    }
    return config;
})

export function post(url, body) {
    return axios.post(BASE_URl + url, body);
}

